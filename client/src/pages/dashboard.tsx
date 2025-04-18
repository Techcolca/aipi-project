import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StatCard from "@/components/stat-card";
import DashboardTabs from "@/components/dashboard-tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { MessageCircle, CheckCircle, Zap, BarChart } from "lucide-react";
import { useTranslation } from "react-i18next";

// Define interface for dashboard stats
interface DashboardStats {
  totalConversations: number;
  resolutionRate: number;
  averageResponseTime: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [location] = useLocation();
  const [initialTab, setInitialTab] = useState("automation");
  const { t } = useTranslation();
  
  // Parse URL query parameters to set the initial tab
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tabParam = searchParams.get("tab");
    
    if (tabParam && ["automation", "conversations", "integrations", "settings", "profile", "forms"].includes(tabParam)) {
      console.log(`Dashboard: Setting initialTab to ${tabParam} from URL query parameters`);
      setInitialTab(tabParam);
    }
  }, [location]);
  
  // Fetch dashboard stats
  const { data: stats, isLoading: isLoadingStats } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
    enabled: !!user,
  });
  
  // Default stats when loading or no data
  const defaultStats = {
    totalConversations: 0,
    resolutionRate: 0,
    averageResponseTime: 0,
  };
  
  const dashboardStats = stats || defaultStats;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Dashboard Header */}
          <div className="mb-8 flex flex-wrap justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("dashboard_title")}</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {t("manage_assistant")}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link href="/analytics">
                <Button className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  {t("analytics")}
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard 
              title={t("total_conversations")}
              value={isLoadingStats ? t("loading") : dashboardStats.totalConversations.toLocaleString()}
              change={12.5}
              icon={<MessageCircle />}
              color="primary"
            />
            
            <StatCard 
              title={t("resolution_rate")}
              value={isLoadingStats ? t("loading") : `${dashboardStats.resolutionRate.toFixed(1)}%`}
              change={3.2}
              icon={<CheckCircle />}
              color="secondary"
            />
            
            <StatCard 
              title={t("avg_response_time")}
              value={isLoadingStats ? t("loading") : `${dashboardStats.averageResponseTime.toFixed(1)}s`}
              change={18.3}
              icon={<Zap />}
              color="accent"
            />
          </div>
          
          {/* Dashboard Tabs */}
          <DashboardTabs initialTab={initialTab} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
