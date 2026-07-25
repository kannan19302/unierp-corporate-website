import {
  CreditCard, Package, Hammer, Users, Heart, Store, Activity, Globe, GraduationCap,
  Building2, Wrench, Bot, BarChart3, FileText, BookOpen, Video, Shield, Award, Sparkles,
  TrendingUp, CheckCircle2, Compass, ArrowRight, ChevronRight, Zap, Lock, Cloud, Database,
  LineChart, Truck, Factory, Briefcase, Calculator, Receipt, Landmark, Boxes, Headphones,
  Rocket, HelpCircle, Star, Mail, Send, Ticket, ShieldCheck, KeyRound, LayoutTemplate,
  Menu, FileStack, Palette, Quote, BadgeIndianRupee,
} from 'lucide-react';

export const ICON_REGISTRY = {
  CreditCard, Package, Hammer, Users, Heart, Store, Activity, Globe, GraduationCap,
  Building2, Wrench, Bot, BarChart3, FileText, BookOpen, Video, Shield, Award, Sparkles,
  TrendingUp, CheckCircle2, Compass, ArrowRight, ChevronRight, Zap, Lock, Cloud, Database,
  LineChart, Truck, Factory, Briefcase, Calculator, Receipt, Landmark, Boxes, Headphones,
  Rocket, HelpCircle, Star, Mail, Send, Ticket, ShieldCheck, KeyRound, LayoutTemplate,
  Menu, FileStack, Palette, Quote, BadgeIndianRupee,
} as const;

export type IconName = keyof typeof ICON_REGISTRY;
export const ICON_NAMES = Object.keys(ICON_REGISTRY) as IconName[];

export function getIcon(name?: string | null) {
  if (name && name in ICON_REGISTRY) {
    return ICON_REGISTRY[name as IconName];
  }
  return HelpCircle;
}
