import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AntirabiesTable,
  AntirabiesData,
} from "@/components/ui/antirabies-table";
import {
  Plus,
  Download,
  FileText,
  Filter,
  ArrowLeft,
  User,
  LogOut,
  Heart,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
} from "lucide-react";

export default function AntirabiesModule() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("register");

  // Form states
  const [formData, setFormData] = useState({
    municipioAtendimento: "",
    nomePaciente: "",
    dataNascimento: "",
    municipioResidencia: "",
    dataAcidente: "",
    tipoAnimal: "",
    animalObservavel: "",
    statusSaudeAnimal: "",
    extensaoFerimento: "",
  });

  // Simulation result
  const [simulationResult, setSimulationResult] = useState<{
    result: string;
    needsVaccination: boolean;
  } | null>(null);

  // Monitoring filters
  const [municipioFilter, setMunicipioFilter] = useState("");
  const [situacaoFilter, setSituacaoFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Mock data for monitoring
  const monitoringData: AntirabiesData[] = [
    {
      id: "1",
      numeroAtendimento: "AR-2024-001",
      municipioSolicitante: "Porto Alegre",
      dataAtendimento: "18/01/2024",
      situacao: "Pendente",
      paciente: "João Silva",
      tipoAnimal: "Cão",
    },
    {
      id: "2",
      numeroAtendimento: "AR-2024-002",
      municipioSolicitante: "Caxias do Sul",
      dataAtendimento: "17/01/2024",
      situacao: "Aprovado",
      paciente: "Maria Santos",
      tipoAnimal: "Gato",
    },
    {
      id: "3",
      numeroAtendimento: "AR-2024-003",
      municipioSolicitante: "Pelotas",
      dataAtendimento: "16/01/2024",
      situacao: "Recusado",
      paciente: "Carlos Lima",
      tipoAnimal: "Morcego",
    },
    {
      id: "4",
      numeroAtendimento: "AR-2024-004",
      municipioSolicitante: "Santa Maria",
      dataAtendimento: "15/01/2024",
      situacao: "Pendente",
      paciente: "Ana Costa",
      tipoAnimal: "Cão",
    },
  ];

  const filteredMonitoringData = monitoringData.filter((request) => {
    return (
      (municipioFilter === "" ||
        request.municipioSolicitante
          .toLowerCase()
          .includes(municipioFilter.toLowerCase())) &&
      (situacaoFilter === "" ||
        situacaoFilter === "todos" ||
        request.situacao === situacaoFilter) &&
      (dateFilter === "" || request.dataAtendimento.includes(dateFilter))
    );
  });

  const municipalities = [
    "Porto Alegre",
    "Caxias do Sul",
    "Pelotas",
    "Santa Maria",
    "Novo Hamburgo",
    "Canoas",
    "Gravataí",
    "Viamão",
    "São Leopoldo",
    "Passo Fundo",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Solicitação enviada com sucesso!");
    // Reset form
    setFormData({
      municipioAtendimento: "",
      nomePaciente: "",
      dataNascimento: "",
      municipioResidencia: "",
      dataAcidente: "",
      tipoAnimal: "",
      animalObservavel: "",
      statusSaudeAnimal: "",
      extensaoFerimento: "",
    });
  };

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple simulation logic
    let needsVaccination = false;
    let result = "";

    const {
      tipoAnimal,
      animalObservavel,
      statusSaudeAnimal,
      extensaoFerimento,
    } = formData;

    if (tipoAnimal === "morcego") {
      needsVaccination = true;
      result =
        "Este caso necessita de vacinação e soro antirrábico (exposição grave - morcego)";
    } else if (
      extensaoFerimento.toLowerCase().includes("grave") ||
      extensaoFerimento.toLowerCase().includes("profundo")
    ) {
      needsVaccination = true;
      result =
        "Este caso necessita de vacinação e soro antirrábico (ferimento grave)";
    } else if (
      (tipoAnimal === "cao" || tipoAnimal === "gato") &&
      animalObservavel === "nao"
    ) {
      needsVaccination = true;
      result =
        "Este caso necessita de vacinação e soro antirrábico (animal não observável)";
    } else if (
      statusSaudeAnimal.toLowerCase().includes("morto") ||
      statusSaudeAnimal.toLowerCase().includes("sintomas")
    ) {
      needsVaccination = true;
      result =
        "Este caso necessita de vacinação e soro antirrábico (animal com sintomas/morto)";
    } else {
      result = "Conduta não indica uso de imunobiológico - apenas observação";
    }

    setSimulationResult({ result, needsVaccination });
  };

  const handleView = (id: string) => {
    alert(`Visualizar atendimento ID: ${id}`);
  };

  const handleEvaluate = (id: string) => {
    alert(`Avaliar solicitação ID: ${id}`);
  };

  const exportCSV = () => {
    const csvContent = [
      ["Nº Atendimento", "Município", "Data", "Paciente", "Animal", "Situação"],
      ...filteredMonitoringData.map((request) => [
        request.numeroAtendimento,
        request.municipioSolicitante,
        request.dataAtendimento,
        request.paciente,
        request.tipoAnimal,
        request.situacao,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "atendimentos_antirabico.csv";
    link.click();
  };

  const renderForm = (isSimulation = false) => (
    <form onSubmit={isSimulation ? handleSimulate : handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="municipioAtendimento">Município de Atendimento</Label>
          <Select
            value={formData.municipioAtendimento}
            onValueChange={(value) =>
              handleInputChange("municipioAtendimento", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar município" />
            </SelectTrigger>
            <SelectContent>
              {municipalities.map((municipality) => (
                <SelectItem key={municipality} value={municipality}>
                  {municipality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nomePaciente">Nome do Paciente</Label>
          <Input
            id="nomePaciente"
            value={formData.nomePaciente}
            onChange={(e) => handleInputChange("nomePaciente", e.target.value)}
            placeholder="Nome completo do paciente"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataNascimento">Data de Nascimento</Label>
          <Input
            id="dataNascimento"
            type="date"
            value={formData.dataNascimento}
            onChange={(e) =>
              handleInputChange("dataNascimento", e.target.value)
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="municipioResidencia">Município de Residência</Label>
          <Select
            value={formData.municipioResidencia}
            onValueChange={(value) =>
              handleInputChange("municipioResidencia", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar município" />
            </SelectTrigger>
            <SelectContent>
              {municipalities.map((municipality) => (
                <SelectItem key={municipality} value={municipality}>
                  {municipality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataAcidente">Data do Acidente</Label>
          <Input
            id="dataAcidente"
            type="date"
            value={formData.dataAcidente}
            onChange={(e) => handleInputChange("dataAcidente", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipoAnimal">Tipo de Animal</Label>
          <Select
            value={formData.tipoAnimal}
            onValueChange={(value) => handleInputChange("tipoAnimal", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cao">Cão</SelectItem>
              <SelectItem value="gato">Gato</SelectItem>
              <SelectItem value="morcego">Morcego</SelectItem>
              <SelectItem value="outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(formData.tipoAnimal === "cao" || formData.tipoAnimal === "gato") && (
          <div className="space-y-2">
            <Label htmlFor="animalObservavel">Animal é observável?</Label>
            <Select
              value={formData.animalObservavel}
              onValueChange={(value) =>
                handleInputChange("animalObservavel", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sim">Sim</SelectItem>
                <SelectItem value="nao">Não</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="statusSaudeAnimal">
            Status de Saúde do Animal no Momento do Acidente
          </Label>
          <Textarea
            id="statusSaudeAnimal"
            value={formData.statusSaudeAnimal}
            onChange={(e) =>
              handleInputChange("statusSaudeAnimal", e.target.value)
            }
            placeholder="Descreva o estado do animal..."
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="extensaoFerimento">
            Extensão / Gravidade do Ferimento
          </Label>
          <Textarea
            id="extensaoFerimento"
            value={formData.extensaoFerimento}
            onChange={(e) =>
              handleInputChange("extensaoFerimento", e.target.value)
            }
            placeholder="Descreva o ferimento..."
            required
          />
        </div>
      </div>

      <div className="mt-6">
        <Button type="submit" className="bg-accent hover:bg-accent/90">
          {isSimulation ? "Simular" : "Enviar Solicitação"}
        </Button>
      </div>
    </form>
  );

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
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Atendimento Antirrábico</h1>
                  <p className="text-sm opacity-90">
                    Atendimento Antirrábico Humano
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
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Atendimentos Hoje
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Novos atendimentos registrados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pendentes de Análise
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">8</div>
              <p className="text-xs text-muted-foreground">
                Aguardando avaliação técnica
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">45</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recusados</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">3</div>
              <p className="text-xs text-muted-foreground">Este mês</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="register">
              Registrar Atendimento e Solicitar Imunobiológico
            </TabsTrigger>
            <TabsTrigger value="simulate">Simular Atendimento</TabsTrigger>
            <TabsTrigger value="monitor">
              Painel de Monitoramento (Estadual)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="register" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Registrar Atendimento
                </CardTitle>
              </CardHeader>
              <CardContent>{renderForm(false)}</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="simulate" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Simulador de Conduta</CardTitle>
              </CardHeader>
              <CardContent>
                {renderForm(true)}

                {simulationResult && (
                  <Alert
                    className={`mt-6 ${
                      simulationResult.needsVaccination
                        ? "border-red-200 bg-red-50"
                        : "border-green-200 bg-green-50"
                    }`}
                  >
                    <AlertTriangle
                      className={`h-4 w-4 ${
                        simulationResult.needsVaccination
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    />
                    <AlertDescription
                      className={
                        simulationResult.needsVaccination
                          ? "text-red-800"
                          : "text-green-800"
                      }
                    >
                      <strong>Resultado da Simulação:</strong> <br />
                      {simulationResult.result}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitor" className="mt-6">
            <div className="space-y-6">
              {/* Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Filter className="w-5 h-5 mr-2" />
                    Filtros - Painel Estadual
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
                      <Label htmlFor="situacao">Situação</Label>
                      <Select
                        value={situacaoFilter}
                        onValueChange={setSituacaoFilter}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar situação" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos</SelectItem>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                          <SelectItem value="Aprovado">Aprovado</SelectItem>
                          <SelectItem value="Recusado">Recusado</SelectItem>
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
                  <div className="mt-4 flex space-x-3">
                    <Button onClick={exportCSV} variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      CSV
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Monitoring Table */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Solicitações Pendentes de Análise (
                    {filteredMonitoringData.length} registros)
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <AntirabiesTable
                    data={filteredMonitoringData}
                    onView={handleView}
                    onEvaluate={handleEvaluate}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
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
