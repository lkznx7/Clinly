"use client";

import { useState, useMemo, useCallback } from "react";
import { useFetch, useDebounce } from "@/lib/hooks";
import { getPatients, createPatient, updatePatient, deletePatient } from "@/lib/api";
import type { Patient, PatientFormData, PatientQueryParams, PaginatedResponse } from "@/lib/types";
import { PageHeader } from "@/components/shared/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { Pagination } from "@/components/shared/pagination";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { TableSkeleton } from "@/components/shared/loading-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Plus, MoreHorizontal, Eye, Pencil, Trash2, Users } from "lucide-react";
import { toast } from "sonner";

export default function PacientesPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const debouncedSearch = useDebounce(search);

  const [formOpen, setFormOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewingPatient, setViewingPatient] = useState<Patient | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingPatient, setDeletingPatient] = useState<Patient | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<PatientFormData>({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    birthDate: "",
    gender: "",
    address: "",
  });

  const queryParams = useMemo<PatientQueryParams>(
    () => ({
      page,
      size: 10,
      search: debouncedSearch || undefined,
      status: statusFilter !== "ALL" ? (statusFilter as "ACTIVE" | "INACTIVE" | "ARCHIVED") : undefined,
      sort: "name,asc",
    }),
    [page, debouncedSearch, statusFilter]
  );

  const fetcher = useCallback(() => getPatients(queryParams), [queryParams]);
  const { data, loading, error, refetch } = useFetch<PaginatedResponse<Patient>>(fetcher, [queryParams]);

  function openCreate() {
    setEditingPatient(null);
    setFormData({ name: "", email: "", phone: "", cpf: "", birthDate: "", gender: "", address: "" });
    setFormOpen(true);
  }

  function openEdit(patient: Patient) {
    setEditingPatient(patient);
    setFormData({
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      cpf: patient.cpf,
      birthDate: patient.birthDate,
      gender: patient.gender,
      address: patient.address,
    });
    setFormOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingPatient) {
        await updatePatient(editingPatient.id, formData);
        toast.success("Paciente atualizado com sucesso.");
      } else {
        await createPatient(formData);
        toast.success("Paciente criado com sucesso.");
      }
      setFormOpen(false);
      refetch();
    } catch {
      toast.error("Erro ao salvar paciente. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deletingPatient) return;
    setDeleting(true);
    try {
      await deletePatient(deletingPatient.id);
      toast.success("Paciente excluído com sucesso.");
      setDeleteOpen(false);
      setDeletingPatient(null);
      refetch();
    } catch {
      toast.error("Erro ao excluir paciente. Tente novamente.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pacientes"
        description="Gerencie os pacientes da clínica"
        action={
          <Button onClick={openCreate} size="sm">
            <Plus className="size-3.5" />
            Novo Paciente
          </Button>
        }
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={search}
          onChange={(v) => { setSearch(v); setPage(0); }}
          placeholder="Buscar por nome, email ou CPF..."
          className="w-full sm:w-80"
        />
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={(v) => { if (v) setStatusFilter(v); setPage(0); }}>
            <SelectTrigger size="sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos</SelectItem>
              <SelectItem value="ACTIVE">Ativo</SelectItem>
              <SelectItem value="INACTIVE">Inativo</SelectItem>
              <SelectItem value="ARCHIVED">Arquivado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : !data || data.content.length === 0 ? (
        <EmptyState
          title="Nenhum paciente encontrado"
          description={search ? "Tente ajustar sua busca." : "Comece cadastrando um novo paciente."}
          icon={<Users className="size-6" />}
          action={
            !search ? (
              <Button onClick={openCreate} size="sm">
                <Plus className="size-3.5" />
                Novo Paciente
              </Button>
            ) : undefined
          }
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead className="hidden md:table-cell">Telefone</TableHead>
                  <TableHead className="hidden lg:table-cell">Última Consulta</TableHead>
                  <TableHead className="hidden lg:table-cell">Próxima Consulta</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.content.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          <AvatarFallback>
                            {patient.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{patient.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{patient.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {patient.phone}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      {patient.lastAppointment
                        ? new Date(patient.lastAppointment).toLocaleDateString("pt-BR")
                        : "—"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      {patient.nextAppointment
                        ? new Date(patient.nextAppointment).toLocaleDateString("pt-BR")
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={patient.status} />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-xs" />}>
                          <MoreHorizontal className="size-3.5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => { setViewingPatient(patient); setViewOpen(true); }}>
                            <Eye className="size-3.5" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openEdit(patient)}>
                            <Pencil className="size-3.5" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => { setDeletingPatient(patient); setDeleteOpen(true); }}
                          >
                            <Trash2 className="size-3.5" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          {data.totalPages > 1 && (
            <div className="border-t px-4">
              <Pagination page={data.page} totalPages={data.totalPages} onPageChange={setPage} />
            </div>
          )}
        </Card>
      )}

      {/* Create / Edit Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingPatient ? "Editar Paciente" : "Novo Paciente"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Nome completo</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="João da Silva"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="joao@email.com"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Telefone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>CPF</Label>
                <Input
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                  placeholder="000.000.000-00"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Data de Nascimento</Label>
                <Input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Gênero</Label>
                <Select value={formData.gender} onValueChange={(v) => { if (v) setFormData({ ...formData, gender: v }) }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Masculino</SelectItem>
                    <SelectItem value="FEMALE">Feminino</SelectItem>
                    <SelectItem value="OTHER">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Endereço</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Rua, número, bairro"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Salvando..." : editingPatient ? "Salvar Alterações" : "Criar Paciente"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes do Paciente</DialogTitle>
          </DialogHeader>
          {viewingPatient && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar size="lg">
                  <AvatarFallback className="text-lg">
                    {viewingPatient.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{viewingPatient.name}</p>
                  <StatusBadge status={viewingPatient.status} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{viewingPatient.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Telefone</p>
                  <p className="font-medium">{viewingPatient.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">CPF</p>
                  <p className="font-medium">{viewingPatient.cpf}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Nascimento</p>
                  <p className="font-medium">
                    {new Date(viewingPatient.birthDate).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Endereço</p>
                  <p className="font-medium">{viewingPatient.address || "—"}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Excluir paciente"
        description={`Tem certeza que deseja excluir ${deletingPatient?.name}? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
