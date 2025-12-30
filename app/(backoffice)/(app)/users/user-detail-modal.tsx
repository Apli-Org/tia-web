"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {
  CheckCircle,
  XCircle,
  Crown,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Heart,
  Ban,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserById } from "@/actions/admin/users.action"

type UserDetailModalProps = {
  userId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

type UserDetail = Awaited<ReturnType<typeof getUserById>>

export function UserDetailModal({
  userId,
  open,
  onOpenChange,
}: UserDetailModalProps) {
  const [user, setUser] = useState<UserDetail | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && userId) {
      setLoading(true)
      getUserById(userId)
        .then(setUser)
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [open, userId])

  const calculateAge = (birthdate: string | null): number | null => {
    if (!birthdate) return null
    const today = new Date()
    const birth = new Date(birthdate)
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const getTierColor = (tier: string | null) => {
    switch (tier) {
      case "elite":
        return "bg-purple-100 text-purple-700"
      case "gold":
        return "bg-amber-100 text-amber-700"
      case "silver":
        return "bg-slate-100 text-slate-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Détails de l&apos;utilisateur</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <Skeleton className="h-32 w-full" />
          </div>
        ) : user ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.profilePhoto || undefined} />
                <AvatarFallback className="text-2xl">
                  {user.firstName?.charAt(0)?.toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">
                    {user.firstName || "Sans nom"}
                  </h3>
                  {user.is_verified && (
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getTierColor(user.current_tier)}>
                    <Crown className="mr-1 h-3 w-3" />
                    {user.current_tier?.toUpperCase() || "BASE"}
                  </Badge>
                  {user.is_active ? (
                    <Badge className="bg-green-100 text-green-700">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Actif
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <XCircle className="mr-1 h-3 w-3" />
                      Inactif
                    </Badge>
                  )}
                  {user.banned_until && new Date(user.banned_until) > new Date() && (
                    <Badge variant="destructive">
                      <Ban className="mr-1 h-3 w-3" />
                      Banni jusqu&apos;au{" "}
                      {new Date(user.banned_until).toLocaleDateString("fr-FR")}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <Tabs defaultValue="info">
              <TabsList>
                <TabsTrigger value="info">Informations</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
                <TabsTrigger value="subscription">Abonnement</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem
                    icon={Calendar}
                    label="Âge"
                    value={
                      calculateAge(user.birthdate)
                        ? `${calculateAge(user.birthdate)} ans`
                        : "-"
                    }
                  />
                  <InfoItem
                    icon={Heart}
                    label="Genre"
                    value={
                      user.gender === "homme"
                        ? "Homme"
                        : user.gender === "femme"
                        ? "Femme"
                        : user.gender === "autre"
                        ? "Autre"
                        : "-"
                    }
                  />
                  <InfoItem
                    icon={MapPin}
                    label="Localisation"
                    value={user.location || "-"}
                  />
                  <InfoItem
                    icon={Briefcase}
                    label="Profession"
                    value={user.profession || "-"}
                  />
                  <InfoItem
                    icon={GraduationCap}
                    label="Éducation"
                    value={user.education_level || "-"}
                  />
                </div>

                {user.bio && (
                  <div>
                    <h4 className="font-medium mb-2">Bio</h4>
                    <p className="text-muted-foreground text-sm">{user.bio}</p>
                  </div>
                )}

                {user.interests && user.interests.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Intérêts</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map((interest: string, i: number) => (
                        <Badge key={i} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Inscription :</span>{" "}
                    {new Date(user.created_at).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Dernière mise à jour :
                    </span>{" "}
                    {new Date(user.updated_at).toLocaleDateString("fr-FR")}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="photos" className="mt-4">
                {user.photos && user.photos.length > 0 ? (
                  <div className="grid grid-cols-3 gap-4">
                    {user.photos.map((photo: string, i: number) => (
                      <div
                        key={i}
                        className="aspect-square relative rounded-lg overflow-hidden bg-muted"
                      >
                        <Image
                          src={photo}
                          alt={`Photo ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Aucune photo
                  </p>
                )}
              </TabsContent>

              <TabsContent value="subscription" className="mt-4">
                {user.subscription && user.subscription.length > 0 ? (
                  <div className="space-y-4">
                    {user.subscription.map((sub: any) => (
                      <div
                        key={sub.id}
                        className="border rounded-lg p-4 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <Badge className={getTierColor(sub.tier)}>
                            {sub.tier?.toUpperCase()}
                          </Badge>
                          <Badge
                            variant={
                              sub.status === "active" ? "default" : "secondary"
                            }
                          >
                            {sub.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>
                            Début :{" "}
                            {new Date(sub.start_date).toLocaleDateString(
                              "fr-FR"
                            )}
                          </p>
                          {sub.end_date && (
                            <p>
                              Fin :{" "}
                              {new Date(sub.end_date).toLocaleDateString(
                                "fr-FR"
                              )}
                            </p>
                          )}
                          <p>
                            Montant :{" "}
                            {sub.amount_paid?.toLocaleString("fr-FR")} MGA
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Aucun abonnement
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            Utilisateur non trouvé
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}
