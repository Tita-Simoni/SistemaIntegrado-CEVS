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
import {
  MedicationTable,
  MedicationData,
} from "@/components/ui/medication-table";
import {
  Plus,
  Download,
  FileText,
  Filter,
  ArrowLeft,
  User,
  LogOut,
  Pill,
  AlertTriangle,
  Package,
  TrendingDown,
} from "lucide-react";

export default function MedicationModule() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [medicamentoFilter, setMedicamentoFilter] = useState("");
  const [loteFilter, setLoteFilter] = useState("");
  const [situacaoFilter, setSituacaoFilter] = useState("");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Mock data - in production this would come from an API
  const medicationData: MedicationData[] = [
    {
      id: "1",
      medicamento: "Oseltamivir 75mg",
      lote: "OSL2024001",
      validade: "15/12/2024",
      quantidadeAtual: 2850,
      ultimaMovimentacao: "Entrada - 18/01/2024",
      situacaoValidade: "Válido",
    },
    {
      id: "2",
      medicamento: "Ribavirin 200mg",
      lote: "RIB2023045",
      validade: "28/02/2024",
      quantidadeAtual: 125,
      ultimaMovimentacao: "Saída - 16/01/2024",
      situacaoValidade: "Próximo ao Vencimento",
    },
    {
      id: "3",
      medicamento: "Sofosbuvir 400mg",
      lote: "SOF2024012",
      validade: "30/06/2025",
      quantidadeAtual: 0,
      ultimaMovimentacao: "Saída - 14/01/2024",
      situacaoValidade: "Crítico",
    },
    {
      id: "4",
      medicamento: "Tenofovir 300mg",
      lote: "TEN2023089",
      validade: "15/01/2024",
      quantidadeAtual: 45,
      ultimaMovimentacao: "Entrada - 10/01/2024",
      situacaoValidade: "Vencido",
    },
    {
      id: "5",
      medicamento: "Efavirenz 600mg",
      lote: "EFA2024007",
      validade: "20/11/2024",
      quantidadeAtual: 1580,
      ultimaMovimentacao: "Entrada - 12/01/2024",
      situacaoValidade: "Válido",
    },
    {
      id: "6",
      medicamento: "Lamivudina 150mg",
      lote: "LAM2024003",
      validade: "10/03/2024",
      quantidadeAtual: 35,
      ultimaMovimentacao: "Saída - 11/01/2024",
      situacaoValidade: "Crítico",
    },
  ];

  const filteredData = medicationData.filter((medication) => {
    return (
      (medicamentoFilter === "" ||
        medication.medicamento
          .toLowerCase()
          .includes(medicamentoFilter.toLowerCase())) &&
      (loteFilter === "" ||
        medication.lote.toLowerCase().includes(loteFilter.toLowerCase())) &&
      (situacaoFilter === "" ||
        situacaoFilter === "todos" ||
        medication.situacaoValidade === situacaoFilter)
    );
  });

  // Calculate statistics
  const totalMedications = medicationData.length;
  const criticalStock = medicationData.filter(
    (m) => m.quantidadeAtual < 50 || m.quantidadeAtual === 0,
  ).length;
  const expiredMedications = medicationData.filter(
    (m) => m.situacaoValidade === "Vencido",
  ).length;
  const nearExpiry = medicationData.filter(
    (m) => m.situacaoValidade === "Próximo ao Vencimento",
  ).length;

  const handleEdit = (id: string) => {
    alert(`Editar medicamento ID: ${id}`);
  };

  const handleHistory = (id: string) => {
    alert(`Ver histórico do medicamento ID: ${id}`);
  };

  const exportCSV = () => {
    const csvContent = [
      [
        "Medicamento",
        "Lote",
        "Validade",
        "Quantidade Atual",
        "Última Movimentação",
        "Situação",
      ],
      ...filteredData.map((medication) => [
        medication.medicamento,
        medication.lote,
        medication.validade,
        medication.quantidadeAtual.toString(),
        medication.ultimaMovimentacao,
        medication.situacaoValidade,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "estoque_medicamentos.csv";
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
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">
                    Medicamentos Estratégicos
                  </h1>
                  <p className="text-sm opacity-90">
                    Controle de Estoque de Medicamentos Estratégicos
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-primary-foreground/10 rounded-lg">
                <User className="w-4 h-4" />
                <span className="text-sm">CEADI - Usuário Logado</span>
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
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Medicamentos
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMedications}</div>
              <p className="text-xs text-muted-foreground">
                Tipos de medicamentos em estoque
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Estoque Crítico
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">
                {criticalStock}
              </div>
              <p className="text-xs text-muted-foreground">
                Medicamentos com estoque baixo/zerado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vencidos</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {expiredMedications}
              </div>
              <p className="text-xs text-muted-foreground">
                Medicamentos com validade vencida
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Próximos ao Vencimento
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {nearExpiry}
              </div>
              <p className="text-xs text-muted-foreground">
                Medicamentos próximos ao vencimento
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Controle de Estoque
            </h2>
            <p className="text-muted-foreground">
              Gerenciamento do estoque de medicamentos estratégicos do CEADI
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
              Registrar Entrada ou Saída
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
                <Label htmlFor="medicamento">Medicamento</Label>
                <Input
                  id="medicamento"
                  placeholder="Buscar por medicamento..."
                  value={medicamentoFilter}
                  onChange={(e) => setMedicamentoFilter(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lote">Lote</Label>
                <Input
                  id="lote"
                  placeholder="Buscar por lote..."
                  value={loteFilter}
                  onChange={(e) => setLoteFilter(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="situacao">Situação de Validade</Label>
                <Select
                  value={situacaoFilter}
                  onValueChange={setSituacaoFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar situação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="Válido">Válido</SelectItem>
                    <SelectItem value="Próximo ao Vencimento">
                      Próximo ao Vencimento
                    </SelectItem>
                    <SelectItem value="Crítico">Crítico</SelectItem>
                    <SelectItem value="Vencido">Vencido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Estoque Atual ({filteredData.length} medicamentos)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <MedicationTable
              data={filteredData}
              onEdit={handleEdit}
              onHistory={handleHistory}
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
