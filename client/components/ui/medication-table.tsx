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
import { Edit, History, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

export interface MedicationData {
  id: string;
  medicamento: string;
  lote: string;
  validade: string;
  quantidadeAtual: number;
  ultimaMovimentacao: string;
  situacaoValidade: "Válido" | "Próximo ao Vencimento" | "Vencido" | "Crítico";
}

interface MedicationTableProps {
  data: MedicationData[];
  onEdit: (id: string) => void;
  onHistory: (id: string) => void;
}

export const MedicationTable = ({
  data,
  onEdit,
  onHistory,
}: MedicationTableProps) => {
  const [sortField, setSortField] = useState<keyof MedicationData | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof MedicationData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;

    let aVal = a[sortField];
    let bVal = b[sortField];

    // Handle numeric sorting for quantity
    if (sortField === "quantidadeAtual") {
      aVal = Number(aVal);
      bVal = Number(bVal);
    }

    if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const getSituacaoValidadeVariant = (
    situacao: MedicationData["situacaoValidade"],
  ) => {
    switch (situacao) {
      case "Válido":
        return "default";
      case "Próximo ao Vencimento":
        return "secondary";
      case "Crítico":
        return "destructive";
      case "Vencido":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getQuantidadeColor = (quantidade: number) => {
    if (quantidade === 0) return "text-red-600";
    if (quantidade < 50) return "text-amber-600";
    return "text-foreground";
  };

  const SortIcon = ({ field }: { field: keyof MedicationData }) => {
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
              onClick={() => handleSort("medicamento")}
            >
              <div className="flex items-center">
                Medicamento
                <SortIcon field="medicamento" />
              </div>
            </TableHead>
            <TableHead
              className="text-primary-foreground cursor-pointer hover:bg-primary/90"
              onClick={() => handleSort("lote")}
            >
              <div className="flex items-center">
                Lote
                <SortIcon field="lote" />
              </div>
            </TableHead>
            <TableHead
              className="text-primary-foreground cursor-pointer hover:bg-primary/90"
              onClick={() => handleSort("validade")}
            >
              <div className="flex items-center">
                Validade
                <SortIcon field="validade" />
              </div>
            </TableHead>
            <TableHead
              className="text-primary-foreground cursor-pointer hover:bg-primary/90"
              onClick={() => handleSort("quantidadeAtual")}
            >
              <div className="flex items-center">
                Quantidade Atual
                <SortIcon field="quantidadeAtual" />
              </div>
            </TableHead>
            <TableHead
              className="text-primary-foreground cursor-pointer hover:bg-primary/90"
              onClick={() => handleSort("ultimaMovimentacao")}
            >
              <div className="flex items-center">
                Última Movimentação
                <SortIcon field="ultimaMovimentacao" />
              </div>
            </TableHead>
            <TableHead className="text-primary-foreground text-center">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((medication) => (
            <TableRow key={medication.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                <div>
                  <div className="font-semibold">{medication.medicamento}</div>
                  <Badge
                    variant={getSituacaoValidadeVariant(
                      medication.situacaoValidade,
                    )}
                    className="mt-1 text-xs"
                  >
                    {medication.situacaoValidade}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm">
                {medication.lote}
              </TableCell>
              <TableCell>{medication.validade}</TableCell>
              <TableCell>
                <span
                  className={`font-semibold ${getQuantidadeColor(medication.quantidadeAtual)}`}
                >
                  {medication.quantidadeAtual.toLocaleString()} un.
                </span>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {medication.ultimaMovimentacao}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(medication.id)}
                    className="h-8 w-8 p-0 hover:bg-primary/10"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onHistory(medication.id)}
                    className="h-8 w-8 p-0 hover:bg-primary/10"
                  >
                    <History className="w-4 h-4" />
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
