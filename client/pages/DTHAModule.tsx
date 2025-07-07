import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, OutbreakData } from "@/components/ui/data-table";
import {
  Plus,
  Download,
  FileText,
  Filter,
  ArrowLeft,
  User,
  LogOut,
  Droplets,
} from "lucide-react";

export default function DTHAModule() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [municipioFilter, setMunicipioFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Mock data - in production this would come from an API
  const outbreakData: OutbreakData[] = [
    {
      id: "1",
      municipio: "Porto Alegre",
      dataNotificacao: "15/01/2024",
      situacao: "Em Investigação",
      responsavel: "Dr. Maria Silva",
      casos: 12,
    },
    {
      id: "2",
      municipio: "Caxias do Sul",
      dataNotificacao: "12/01/2024",
      situacao: "Em Andamento",
      responsavel: "Dr. João Santos",
      casos: 8,
    },
    {
      id: "3",
      municipio: "Pelotas",
      dataNotificacao: "10/01/2024",
      situacao: "Concluído",
      responsavel: "Dra. Ana Costa",
      casos: 5,
    },
    {
      id: "4",
      municipio: "Santa Maria",
      dataNotificacao: "08/01/2024",
      situacao: "Encerrado",
      responsavel: "Dr. Carlos Lima",
      casos: 15,
    },
    {
      id: "5",
      municipio: "Novo Hamburgo",
      dataNotificacao: "05/01/2024",
      situacao: "Em Investigação",
      responsavel: "Dra. Laura Oliveira",
      casos: 7,
    },
  ];

  const filteredData = outbreakData.filter((outbreak) => {
    return (
      (municipioFilter === "" ||
        outbreak.municipio
          .toLowerCase()
          .includes(municipioFilter.toLowerCase())) &&
      (statusFilter === "" ||
        statusFilter === "todos" ||
        outbreak.situacao === statusFilter) &&
      (dateFilter === "" || outbreak.dataNotificacao.includes(dateFilter))
    );
  });

  const handleView = (id: string) => {
    alert(`Visualizar surto ID: ${id}`);
  };

  const handleEdit = (id: string) => {
    alert(`Editar surto ID: ${id}`);
  };

  const handleClose = (id: string) => {
    alert(`Encerrar surto ID: ${id}`);
  };

  const exportCSV = () => {
    const csvContent = [
      ["Município", "Data da Notificação", "Situação", "Responsável", "Casos"],
      ...filteredData.map((outbreak) => [
        outbreak.municipio,
        outbreak.dataNotificacao,
        outbreak.situacao,
        outbreak.responsavel,
        outbreak.casos.toString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "surtos_dtha.csv";
    link.click();
  };

  const exportPDF = () => {
    alert("Exportação em PDF será implementada em breve");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/dashboard")}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <div className="w-px h-6 bg-primary-foreground/20" />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">DTHA</h1>
                  <p className="text-sm opacity-90">
                    Surtos de Doenças de Transmissão Hídrica e Alimentar
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-primary-foreground/10 rounded-lg">
                <User className="w-4 h-4" />
                <span className="text-sm">Dr. Usuário Logado</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Action Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Gestão de Surtos DTHA
            </h2>
            <p className="text-muted-foreground">
              Monitoramento e controle de surtos de doenças de transmissão
              hídrica e alimentar
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button onClick={exportCSV} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              CSV
            </Button>
            <Button onClick={exportPDF} variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              PDF
            </Button>
            <Button className="bg-accent hover:bg-accent/90">
              <Plus className="w-4 h-4 mr-2" />
              Nova Notificação de Surto
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Filter className="w-5 h-5 mr-2" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="municipio">Município</Label>
                <Input
                  id="municipio"
                  placeholder="Buscar por município..."
                  value={municipioFilter}
                  onChange={(e) => setMunicipioFilter(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="Em Investigação">
                      Em Investigação
                    </SelectItem>
                    <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                    <SelectItem value="Concluído">Concluído</SelectItem>
                    <SelectItem value="Encerrado">Encerrado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="data">Data</Label>
                <Input
                  id="data"
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Surtos em Andamento ({filteredData.length} registros)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable
              data={filteredData}
              onView={handleView}
              onEdit={handleEdit}
              onClose={handleClose}
            />
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">
                    GOV
                  </span>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  GOVRS
                </span>
              </div>
              <div className="w-px h-6 bg-border" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-xs">
                    CEVS
                  </span>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  CEVS
                </span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground text-center md:text-right">
              <p>
                Sistema Integrado de Gestão Estratégica em Vigilância em Saúde
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
