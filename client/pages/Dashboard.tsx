import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ModuleCard } from "@/components/ui/module-card";
import {
  Droplets,
  Shield,
  Pill,
  Heart,
  Activity,
  Users,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const modules = [
    {
      title: "Surtos de Doenças de Transmissão Hídrica e Alimentar (DTHA)",
      description:
        "Monitoramento e investigação de surtos relacionados a doenças transmitidas pela água e alimentos.",
      icon: Droplets,
      onClick: () => navigate("/modules/dtha"),
    },
    {
      title: "Notificação de Imunobiológicos sob Suspeita",
      description:
        "Sistema de notificação e acompanhamento de eventos adversos relacionados a imunobiológicos.",
      icon: Shield,
      onClick: () => navigate("/modules/immunobiological"),
    },
    {
      title: "Medicamentos Estratégicos (Solicitação e Controle)",
      description:
        "Gestão de solicitações e controle de medicamentos estratégicos para o sistema de saúde.",
      icon: Pill,
      onClick: () => navigate("/modules/medication"),
    },
    {
      title: "Atendimento Antirrábico Humano",
      description:
        "Controle e acompanhamento dos atendimentos antirrábicos em humanos no estado.",
      icon: Heart,
      onClick: () => navigate("/modules/antirabies"),
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo ao SIGEVES
          </h1>
          <p className="text-muted-foreground text-lg">
            Selecione um módulo abaixo para acessar as funcionalidades do
            sistema.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Notificações Ativas
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">
                +12% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Surtos Investigados
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Usuários Ativos
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">489</div>
              <p className="text-xs text-muted-foreground">
                Profissionais cadastrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Alertas Pendentes
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">8</div>
              <p className="text-xs text-muted-foreground">
                Requerem atenção imediata
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Modules Grid */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Módulos do Sistema
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((module, index) => (
                <ModuleCard
                  key={index}
                  title={module.title}
                  description={module.description}
                  icon={module.icon}
                  onClick={module.onClick}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>
                Últimas ações registradas no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Nova notificação DTHA registrada
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Porto Alegre - Há 2 horas
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Solicitação de medicamento aprovada
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Caxias do Sul - Há 4 horas
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Atendimento antirrábico concluído
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Pelotas - Há 6 horas
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
