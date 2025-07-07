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
import { Eye, Edit, XCircle, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

export interface OutbreakData {
  id: string;
  municipio: string;
  dataNotificacao: string;
  situacao: "Em Investigação" | "Em Andamento" | "Concluído" | "Encerrado";
  responsavel: string;
  casos: number;
}

interface DataTableProps {
  data: OutbreakData[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onClose: (id: string) => void;
}

export const DataTable = ({
  data,
  onView,
  onEdit,
  onClose,
}: DataTableProps) => {
  const [sortField, setSortField] = useState<keyof OutbreakData | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof OutbreakData) => {
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

  const getSituacaoVariant = (situacao: OutbreakData["situacao"]) => {
    switch (situacao) {
      case "Em Investigação":
        return "secondary";
      case "Em Andamento":
        return "destructive";
      case "Concluído":
        return "default";
      case "Encerrado":
        return "outline";
      default:
        return "secondary";
    }
  };

  const SortIcon = ({ field }: { field: keyof OutbreakData }) => {
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
              onClick={() => handleSort("municipio")}
            >
              <div className="flex items-center">
                Município
                <SortIcon field="municipio" />
              </div>
            </TableHead>
            <TableHead
              className="text-primary-foreground cursor-pointer hover:bg-primary/90"
              onClick={() => handleSort("dataNotificacao")}
            >
              <div className="flex items-center">
                Data da Notificação
                <SortIcon field="dataNotificacao" />
              </div>
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
            <TableHead className="text-primary-foreground">
              Responsável
            </TableHead>
            <TableHead className="text-primary-foreground">Casos</TableHead>
            <TableHead className="text-primary-foreground text-center">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((outbreak) => (
            <TableRow key={outbreak.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                {outbreak.municipio}
              </TableCell>
              <TableCell>{outbreak.dataNotificacao}</TableCell>
              <TableCell>
                <Badge variant={getSituacaoVariant(outbreak.situacao)}>
                  {outbreak.situacao}
                </Badge>
              </TableCell>
              <TableCell>{outbreak.responsavel}</TableCell>
              <TableCell>{outbreak.casos}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(outbreak.id)}
                    className="h-8 w-8 p-0 hover:bg-primary/10"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(outbreak.id)}
                    className="h-8 w-8 p-0 hover:bg-primary/10"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onClose(outbreak.id)}
                    className="h-8 w-8 p-0 hover:bg-accent/10 text-accent hover:text-accent"
                  >
                    <XCircle className="w-4 h-4" />
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
