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
import { Eye, Edit, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

export interface ImmunobiologicalData {
  id: string;
  codigo: string;
  data: string;
  municipio: string;
  imunobiologico: string;
  lote: string;
  situacao: "Notificado" | "Em Análise" | "Investigado" | "Encerrado";
}

interface ImmunobiologicalTableProps {
  data: ImmunobiologicalData[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

export const ImmunobiologicalTable = ({
  data,
  onView,
  onEdit,
}: ImmunobiologicalTableProps) => {
  const [sortField, setSortField] = useState<keyof ImmunobiologicalData | null>(
    null,
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof ImmunobiologicalData) => {
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

  const getSituacaoVariant = (situacao: ImmunobiologicalData["situacao"]) => {
    switch (situacao) {
      case "Notificado":
        return "secondary";
      case "Em Análise":
        return "destructive";
      case "Investigado":
        return "default";
      case "Encerrado":
        return "outline";
      default:
        return "secondary";
    }
  };

  const SortIcon = ({ field }: { field: keyof ImmunobiologicalData }) => {
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
              onClick={() => handleSort("codigo")}
            >
              <div className="flex items-center">
                Código
                <SortIcon field="codigo" />
              </div>
            </TableHead>
            <TableHead
              className="text-primary-foreground cursor-pointer hover:bg-primary/90"
              onClick={() => handleSort("data")}
            >
              <div className="flex items-center">
                Data
                <SortIcon field="data" />
              </div>
            </TableHead>
            <TableHead
              className="text-primary-foreground cursor-pointer hover:bg-primary/90"
              onClick={() => handleSort("municipio")}
            >
              <div className="flex items-center">
                Município
                <SortIcon field="municipio" />
              </div>
            </TableHead>
            <TableHead className="text-primary-foreground">
              Imunobiológico
            </TableHead>
            <TableHead className="text-primary-foreground">Lote</TableHead>
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
          {sortedData.map((notification) => (
            <TableRow key={notification.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                {notification.codigo}
              </TableCell>
              <TableCell>{notification.data}</TableCell>
              <TableCell>{notification.municipio}</TableCell>
              <TableCell>{notification.imunobiologico}</TableCell>
              <TableCell>{notification.lote}</TableCell>
              <TableCell>
                <Badge variant={getSituacaoVariant(notification.situacao)}>
                  {notification.situacao}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(notification.id)}
                    className="h-8 w-8 p-0 hover:bg-primary/10"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(notification.id)}
                    className="h-8 w-8 p-0 hover:bg-primary/10"
                  >
                    <Edit className="w-4 h-4" />
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
