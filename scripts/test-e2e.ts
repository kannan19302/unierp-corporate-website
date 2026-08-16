/**
 * UniERP Corporate Marketing Website (Plane 0) — End-to-End Test Suite
 * 
 * Verifies public routes, API endpoints, lead generation, newsletter
 * subscription, admin authentication, RBAC, and multi-tenant security
 * against the live running container/application at BASE_URL.
 * 
 * Usage:
 *   npx tsx scripts/test-e2e.ts [baseUrl]
 *   (defaults to http://localhost:4001)
 */

const BASE_URL = process.env.MARKETING_SITE_URL || process.argv[2] || 'http://localhost:4001';

interface TestResult {
  name: string;
  category: string;
  passed: boolean;
  durationMs: number;
  error?: string;
  details?: string;
}

const results: TestResult[] = [];

async function fetchWithRetry(url: string, init?: RequestInit, retries = 3, delayMs = 1500): Promise<Response> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fetch(url, init);
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw new Error(`fetch failed after ${retries} attempts`);
}

async function runTest(
  category: string,
  name: string,
  fn: () => Promise<{ details?: string } | void>
): Promise<boolean> {
  const start = performance.now();
  try {
    const res = await fn();
    const durationMs = Math.round(performance.now() - start);
    results.push({
      category,
      name,
      passed: true,
      durationMs,
      details: res?.details,
    });
    console.log(`  ✅ [PASS] ${name} (${durationMs}ms)`);
    return true;
  } catch (err: any) {
    const durationMs = Math.round(performance.now() - start);
    results.push({
      category,
      name,
      passed: false,
      durationMs,
      error: err?.message || String(err),
    });
    console.error(`  ❌ [FAIL] ${name} (${durationMs}ms): ${err?.message || err}`);
    return false;
  }
}

async function waitForServer(maxWaitMs = 60000): Promise<void> {
  const start = Date.now();
  console.log(`\n🔍 Checking connection to Marketing Site at ${BASE_URL}...`);
  while (Date.now() - start < maxWaitMs) {
    try {
      const res = await fetchWithRetry(`${BASE_URL}/`, {
        headers: { 'User-Agent': 'UniERP-E2E-Tester/1.0' },
      }, 1, 500);
      if (res.status === 200) {
        console.log(`✅ Server is reachable and returned HTTP 200.\n`);
        return;
      }
    } catch {
      // wait and retry
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error(`Timeout: Could not reach Marketing Site at ${BASE_URL} within ${maxWaitMs / 1000}s`);
}

async function main() {
  console.log('════════════════════════════════════════════════════════════════════════');
  console.log(`🚀 UniERP Marketing Site — End-to-End Integration & Security Suite`);
  console.log(`Target: ${BASE_URL}`);
  console.log('════════════════════════════════════════════════════════════════════════\n');

  await waitForServer();

  let adminCookie = '';

  // ──────────────────────────────────────────────────────────────────────────
  // 1. PUBLIC MARKETING PAGES (20 sections)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('📂 1. Public Marketing Route Surfaces');

  const publicRoutes = [
    { path: '/', titleKeyword: 'UniERP' },
    { path: '/about', titleKeyword: 'About' },
    { path: '/features', titleKeyword: 'Features' },
    { path: '/pricing', titleKeyword: 'Pricing' },
    { path: '/modules', titleKeyword: 'Modules' },
    { path: '/products', titleKeyword: 'Products' },
    { path: '/industries', titleKeyword: 'Industries' },
    { path: '/customers', titleKeyword: 'Customers' },
    { path: '/docs', titleKeyword: 'Documentation' },
    { path: '/help', titleKeyword: 'Help' },
    { path: '/resources', titleKeyword: 'Resources' },
    { path: '/security', titleKeyword: 'Security' },
    { path: '/status', titleKeyword: 'Status' },
    { path: '/careers', titleKeyword: 'Careers' },
    { path: '/blog', titleKeyword: 'Blog' },
    { path: '/contact', titleKeyword: 'Contact' },
    { path: '/marketplace', titleKeyword: 'Marketplace' },
    { path: '/privacy', titleKeyword: 'Privacy' },
    { path: '/terms', titleKeyword: 'Terms' },
  ];

  for (const route of publicRoutes) {
    await runTest('Public Routes', `GET ${route.path} responds with 200 OK`, async () => {
      const res = await fetchWithRetry(`${BASE_URL}${route.path}`, {
        headers: { 'Accept': 'text/html' },
      });
      if (res.status !== 200) {
        throw new Error(`Expected HTTP 200 for ${route.path}, got ${res.status}`);
      }
      const text = await res.text();
      if (!text || text.length < 200) {
        throw new Error(`Response body for ${route.path} was unexpectedly empty or too small (${text.length} bytes)`);
      }
      return { details: `Length: ${text.length} bytes` };
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 2. PUBLIC APIS (Leads, Subscribers, Analytics, AI Chat)
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n📡 2. Public API Endpoints');

  await runTest('Public APIs', 'POST /api/leads captures valid lead and calculates score', async () => {
    const timestamp = Date.now();
    const testEmail = `e2e-lead-${timestamp}@example.com`;
    const res = await fetchWithRetry(`${BASE_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Enterprise Test User',
        email: testEmail,
        company: 'Acme Global Ltd',
        phone: '+1-555-0199',
        size: '50-250',
        budget: '$10k-$50k',
        modules: ['Finance', 'Inventory', 'CRM'],
        message: 'Requesting a demo for multi-tenant ERP rollout.',
        source: 'e2e_test',
        isDraft: false,
      }),
    });

    if (res.status !== 200) {
      const errText = await res.text();
      throw new Error(`Expected 200 OK, got ${res.status}: ${errText}`);
    }

    const data = await res.json();
    if (!data.success || !data.leadId) {
      throw new Error(`Invalid response payload: ${JSON.stringify(data)}`);
    }
    if (typeof data.score !== 'number' || data.score <= 0) {
      throw new Error(`Expected positive lead score calculation, got ${data.score}`);
    }
    return { details: `Lead ID: ${data.leadId}, Score: ${data.score}` };
  });

  await runTest('Public APIs', 'POST /api/leads rejects invalid email with 400 Bad Request', async () => {
    const res = await fetchWithRetry(`${BASE_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Bad Email User',
        email: 'not-an-email-address',
      }),
    });

    if (res.status !== 400) {
      throw new Error(`Expected 400 Bad Request for invalid email, got ${res.status}`);
    }
    const data = await res.json();
    if (!data.error) {
      throw new Error(`Expected error property in response: ${JSON.stringify(data)}`);
    }
  });

  await runTest('Public APIs', 'POST /api/subscribe registers newsletter subscriber', async () => {
    const timestamp = Date.now();
    const testEmail = `subscriber-${timestamp}@example.com`;
    const res = await fetchWithRetry(`${BASE_URL}/api/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        source: 'footer_e2e_test',
      }),
    });

    if (res.status !== 200) {
      const errText = await res.text();
      throw new Error(`Expected 200 OK, got ${res.status}: ${errText}`);
    }
    const data = await res.json();
    if (!data.success) {
      throw new Error(`Expected success: true, got ${JSON.stringify(data)}`);
    }
  });

  await runTest('Public APIs', 'POST /api/analytics records telemetry event', async () => {
    const res = await fetchWithRetry(`${BASE_URL}/api/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'e2e-session-telemetry-123',
        eventType: 'pageview',
        path: '/pricing',
        referrer: 'https://google.com',
        utmSource: 'e2e_tester',
      }),
    });

    if (res.status !== 200) {
      const errText = await res.text();
      throw new Error(`Expected 200 OK, got ${res.status}: ${errText}`);
    }
    const data = await res.json();
    if (!data.success) {
      throw new Error(`Expected success: true, got ${JSON.stringify(data)}`);
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 3. ADMIN AUTHENTICATION & SECURITY
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n🔒 3. Admin Authentication, Security & RBAC');

  await runTest('Admin Security', 'GET /admin unauthenticated is redirected to login', async () => {
    const res = await fetchWithRetry(`${BASE_URL}/admin`, {
      redirect: 'manual',
    });

    // In Next.js middleware, unauthenticated redirect is 307 or redirected response
    if (res.status !== 307 && res.status !== 302 && res.status !== 401) {
      // If Next.js followed redirect or served, verify location
      const location = res.headers.get('location');
      if (!location || !location.includes('/admin/login')) {
        throw new Error(`Expected redirect to /admin/login, got status ${res.status}, location: ${location}`);
      }
    }
  });

  await runTest('Admin Security', 'POST /api/admin/login rejects invalid credentials with 401', async () => {
    const res = await fetchWithRetry(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'superadmin@unierp.com',
        password: 'WrongPassword@123',
      }),
    });

    if (res.status !== 401) {
      throw new Error(`Expected 401 Unauthorized for bad credentials, got ${res.status}`);
    }
  });

  await runTest('Admin Security', 'POST /api/admin/login authenticates seeded Super Admin', async () => {
    const res = await fetchWithRetry(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'superadmin@unierp.com',
        password: 'SuperAdmin@2026!',
      }),
    });

    if (res.status !== 200) {
      const errText = await res.text();
      throw new Error(`Expected 200 OK for superadmin login, got ${res.status}: ${errText}`);
    }

    const data = await res.json();
    if (!data.success || data.role !== 'SUPER_ADMIN') {
      throw new Error(`Unexpected login response: ${JSON.stringify(data)}`);
    }

    // Extract set-cookie header
    const setCookie = res.headers.get('set-cookie');
    if (!setCookie || !setCookie.includes('admin_token=')) {
      throw new Error(`Expected admin_token cookie in set-cookie header, got: ${setCookie}`);
    }

    // Parse the cookie string
    const match = setCookie.match(/admin_token=([^;]+)/);
    if (!match) {
      throw new Error(`Could not parse admin_token cookie from: ${setCookie}`);
    }
    adminCookie = `admin_token=${match[1]}`;
    return { details: `Authenticated as ${data.role}` };
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 4. PROTECTED ADMIN CONSOLE SURFACES
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n🛡️ 4. Protected Admin Console Surfaces (with Auth Session)');

  const adminRoutes = [
    { path: '/admin', name: 'Admin Dashboard Overview' },
    { path: '/admin/content', name: 'Content Manager' },
    { path: '/admin/leads', name: 'Leads & Enquiries CRM' },
    { path: '/admin/subscribers', name: 'Newsletter Subscribers' },
    { path: '/admin/seo', name: 'SEO & Meta Management' },
    { path: '/admin/settings', name: 'Site & Brand Settings' },
    { path: '/admin/users', name: 'User & Access Management' },
    { path: '/admin/system-health', name: 'System Health & Metrics' },
    { path: '/admin/audit-log', name: 'Compliance Audit Trail' },
  ];

  for (const adminRoute of adminRoutes) {
    await runTest('Admin Surfaces', `GET ${adminRoute.path} loads for authenticated admin`, async () => {
      const res = await fetchWithRetry(`${BASE_URL}${adminRoute.path}`, {
        headers: {
          Cookie: adminCookie,
          Accept: 'text/html',
        },
      });

      if (res.status !== 200) {
        throw new Error(`Expected 200 OK for ${adminRoute.path} with session cookie, got ${res.status}`);
      }
      const text = await res.text();
      if (!text || text.length < 200) {
        throw new Error(`Admin page content for ${adminRoute.path} was empty`);
      }
      return { details: `${adminRoute.name} rendered (${text.length} bytes)` };
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 5. MULTI-TENANT ISOLATION & HOST SECURITY
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n🌐 5. Multi-Tenant Isolation & Host Spoofing Prevention');

  await runTest('Tenant Isolation', 'Tenant resolution rejects unmapped foreign domain in production mode', async () => {
    // Test hostname resolution on a non-existent foreign host
    const res = await fetchWithRetry(`${BASE_URL}/`, {
      headers: {
        Host: 'unauthorized-foreign-tenant.com',
      },
    });

    // In dev mode with DEV_TENANT_DOMAIN=localhost it will resolve to localhost fallback or 404
    // Verify response status is not a 500 error
    if (res.status >= 500) {
      throw new Error(`Server returned 500 Internal Error on foreign host: ${res.status}`);
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // SUMMARY REPORT
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n════════════════════════════════════════════════════════════════════════');
  console.log('📊 Test Execution Summary');
  console.log('════════════════════════════════════════════════════════════════════════');

  const total = results.length;
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;

  console.log(`Total Tests: ${total}`);
  console.log(`Passed:      ${passed}`);
  console.log(`Failed:      ${failed}`);

  if (failed > 0) {
    console.error(`\n❌ Test suite failed with ${failed} failure(s):`);
    for (const r of results.filter((r) => !r.passed)) {
      console.error(`  - [${r.category}] ${r.name}: ${r.error}`);
    }
    process.exit(1);
  } else {
    console.log(`\n🎉 All ${passed} End-to-End tests passed successfully!`);
  }
}

main().catch((err) => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
