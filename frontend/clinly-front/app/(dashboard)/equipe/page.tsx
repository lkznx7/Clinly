"use client";

import { useState, useMemo, useCallback } from "react";
import { useFetch, useDebounce } from "@/lib/hooks";
import { getStaff, createStaffMember, updateStaffMember, deleteStaffMember } from "@/lib/api";
import type { Staff, StaffFormData, StaffQueryParams, StaffRole, PaginatedResponse } from "@/lib/types";
import { PageHeader } from "@/components/shared/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { Pagination } from "@/components/shared/pagination";
import { StatusBadge } from "@/components/shared/status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { TableSkeleton } from "@/components/shared/loading-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Pencil, Trash2, UserCog, Stethoscope, Users, Briefcase } from "lucide-react";
import { toast } from "sonner";

const roleLabels: Record<string, string> = {
  DOCTOR: "Médico(a)",
  NURSE: "Enfermeiro(a)",
  RECEPTIONIST: "Recepcionista",
  ADMIN: "Administrador(a)",
};

export default function EquipePage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const debouncedSearch = useDebounce(search);

  const [formOpen, setFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Staff | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingMember, setDeletingMember] = useState<Staff | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<StaffFormData>({
    name: "",
    email: "",
    phone: "",
    role: "DOCTOR",
    specialty: "",
    crm: "",
  });

  const queryParams = useMemo<StaffQueryParams>(
    () => ({
      page,
      size: 10,
      search: debouncedSearch || undefined,
      role: roleFilter !== "ALL" ? (roleFilter as StaffRole) : undefined,
      sort: "name,asc",
    }),
    [page, debouncedSearch, roleFilter]
  );

  const fetcher = useCallback(() => getStaff(queryParams), [queryParams]);
  const { data, loading, error, refetch } = useFetch<PaginatedResponse<Staff>>(fetcher, [queryParams]);

  function openCreate() {
    setEditingMember(null);
    setFormData({ name: "", email: "", phone: "", role: "DOCTOR", specialty: "", crm: "" });
    setFormOpen(true);
  }

  function openEdit(member: Staff) {
    setEditingMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role,
      specialty: member.specialty ?? "",
      crm: member.crm ?? "",
    });
    setFormOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingMember) {
        await updateStaffMember(editingMember.id, formData);
        toast.success("Membro atualizado com sucesso.");
      } else {
        await createStaffMember(formData);
        toast.success("Membro adicionado com sucesso.");
      }
      setFormOpen(false);
      refetch();
    } catch {
      toast.error("Erro ao salvar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deletingMember) return;
    setDeleting(true);
    try {
      await deleteStaffMember(deletingMember.id);
      toast.success("Membro removido com sucesso.");
      setDeleteOpen(false);
      setDeletingMember(null);
      refetch();
    } catch {
      toast.error("Erro ao remover. Tente novamente.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Equipe"
        description="Gerencie os membros da equipe"
        action={
          <Button onClick={openCreate} size="sm">
            <Plus className="size-3.5" />
            Adicionar Membro
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Membros</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data?.totalElements ?? 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Médicos</CardTitle>
            <Stethoscope className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {data?.content.filter((s) => s.role === "DOCTOR").length ?? 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ativos</CardTitle>
            <Briefcase className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {data?.content.filter((s) => s.status === "ACTIVE").length ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={search}
          onChange={(v) => { setSearch(v); setPage(0); }}
          placeholder="Buscar por nome, email ou CRM..."
          className="w-full sm:w-80"
        />
        <Select value={roleFilter} onValueChange={(v) => { if (v) setRoleFilter(v); setPage(0); }}>
          <SelectTrigger size="sm">
            <SelectValue placeholder="Cargo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            <SelectItem value="DOCTOR">Médico(a)</SelectItem>
            <SelectItem value="NURSE">Enfermeiro(a)</SelectItem>
            <SelectItem value="RECEPTIONIST">Recepcionista</SelectItem>
            <SelectItem value="ADMIN">Administrador(a)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : !data || data.content.length === 0 ? (
        <EmptyState
          title="Nenhum membro encontrado"
          description={search ? "Tente ajustar sua busca." : "Comece adicionando um membro à equipe."}
          icon={<UserCog className="size-6" />}
          action={
            !search ? (
              <Button onClick={openCreate} size="sm">
                <Plus className="size-3.5" />
                Adicionar Membro
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
                  <TableHead>Membro</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead className="hidden md:table-cell">Especialidade</TableHead>
                  <TableHead className="hidden lg:table-cell">CRM</TableHead>
                  <TableHead className="hidden lg:table-cell">Telefone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.content.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar size="sm">
                          <AvatarFallback>
                            {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{member.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {roleLabels[member.role] ?? member.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {member.specialty ?? "—"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      {member.crm ?? "—"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      {member.phone}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={member.status} />
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-xs" />}>
                          <MoreHorizontal className="size-3.5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(member)}>
                            <Pencil className="size-3.5" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => { setDeletingMember(member); setDeleteOpen(true); }}
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
            <DialogTitle>{editingMember ? "Editar Membro" : "Adicionar Membro"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label>Nome completo</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Dr. João da Silva"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="joao@clinly.com"
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
                <Label>Cargo</Label>
                <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v as StaffRole })}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DOCTOR">Médico(a)</SelectItem>
                    <SelectItem value="NURSE">Enfermeiro(a)</SelectItem>
                    <SelectItem value="RECEPTIONIST">Recepcionista</SelectItem>
                    <SelectItem value="ADMIN">Administrador(a)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Especialidade</Label>
                <Input
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  placeholder="Cardiologia"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>CRM</Label>
                <Input
                  value={formData.crm}
                  onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
                  placeholder="12345/SP"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Salvando..." : editingMember ? "Salvar Alterações" : "Adicionar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Remover membro"
        description={`Tem certeza que deseja remover ${deletingMember?.name} da equipe? Esta ação não pode ser desfeita.`}
        confirmLabel="Remover"
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
