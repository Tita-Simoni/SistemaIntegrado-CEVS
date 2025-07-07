import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, FileCheck, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

export interface AntirabiesData {
  id: string;
  numeroAtendimento: string;
  municipioSolicitante: string;
  dataAtendimento: string;
  situacao: "Pendente" | "Aprovado" | "Recusado";
  paciente: string;
  tipoAnimal: string;
}

interface AntirabiesTableProps {
  data: AntirabiesData[];
  onView: (id: string) => void;
  onEvaluate: (id: string) => void;
}

export const AntirabiesTable = ({
  data,
  onView,
  onEvaluate,
}: AntirabiesTableProps) => {
  const [sortField, setSortField] = useState<keyof AntirabiesData | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof AntirabiesData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;

    const aVal = a[sortField];
    const bVal = b[sortField];

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const getSituacaoVariant = (situacao: AntirabiesData["situacao"]) => {
    switch (situacao) {
      case "Pendente":
        return "secondary";
      case "Aprovado":
        return "default";
      case "Recusado":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const SortIcon = ({ field }: { field: keyof AntirabiesData }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 ml-1" />
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary">
            <TableHead
              className="text-primary-foreground cursor-pointer hover:bg-primary/90"
              onClick={() => handleSort("numeroAtendimento")}
            >
              <div className="flex items-center">
                Nº do Atendimento
                <SortIcon field="numeroAtendimento" />
              </div>
            </TableHead>
            <TableHead
              className="text-primary-foreground cursor-pointer hover:bg-primary/90"
              onClick={() => handleSort("municipioSolicitante")}
            >
              <div className="flex items-center">
                Município Solicitante
                <SortIcon field="municipioSolicitante" />
              </div>
            </TableHead>
            <TableHead
              className="text-primary-foreground cursor-pointer hover:bg-primary/90"
              onClick={() => handleSort("dataAtendimento")}
            >
              <div className="flex items-center">
                Data do Atendimento
                <SortIcon field="dataAtendimento" />
              </div>
            </TableHead>
            <TableHead className="text-primary-foreground">Paciente</TableHead>
            <TableHead className="text-primary-foreground">
              Tipo de Animal
            </TableHead>
            <TableHead
              className="text-primary-foreground cursor-pointer hover:bg-primary/90"
              onClick={() => handleSort("situacao")}
            >
              <div className="flex items-center">
                Situação
                <SortIcon field="situacao" />
              </div>
            </TableHead>
            <TableHead className="text-primary-foreground text-center">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((request) => (
            <TableRow key={request.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                {request.numeroAtendimento}
              </TableCell>
              <TableCell>{request.municipioSolicitante}</TableCell>
              <TableCell>{request.dataAtendimento}</TableCell>
              <TableCell>{request.paciente}</TableCell>
              <TableCell className="capitalize">{request.tipoAnimal}</TableCell>
              <TableCell>
                <Badge variant={getSituacaoVariant(request.situacao)}>
                  {request.situacao}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(request.id)}
                    className="h-8 w-8 p-0 hover:bg-primary/10"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEvaluate(request.id)}
                    className="h-8 w-8 p-0 hover:bg-primary/10"
                    disabled={request.situacao !== "Pendente"}
                  >
                    <FileCheck className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
