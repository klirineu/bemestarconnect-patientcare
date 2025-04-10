"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  UserCircle,
  Menu,
  BarChart3,
  Users,
  Calendar,
  CreditCard,
  ClipboardList,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center justify-between w-full">
          {/* Esquerda: Logo ou Menu Mobile */}
          <div className="flex items-center">
            {/* MedCare - apenas no desktop */}
            <Link
              href="/"
              prefetch
              className="hidden md:block text-xl font-bold"
            >
              MedCare
            </Link>

            {/* Menu Mobile - apenas no celular */}
            <div className="md:hidden">
              <DropdownMenu
                open={mobileMenuOpen}
                onOpenChange={setMobileMenuOpen}
              >
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <BarChart3 className="mr-2 h-4 w-4" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/patients">
                      <Users className="mr-2 h-4 w-4" /> Patients
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/appointments">
                      <Calendar className="mr-2 h-4 w-4" /> Appointments
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/finances">
                      <CreditCard className="mr-2 h-4 w-4" /> Finances
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/treatment-plans">
                      <ClipboardList className="mr-2 h-4 w-4" /> Treatment Plans
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Centro: Menu Desktop */}
          <div className="hidden md:flex justify-center flex-1">
            <div className="flex gap-4 items-center">
              <NavLinks isActive={isActive} />
            </div>
          </div>

          {/* Direita: Menu do usuário */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserCircle className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await supabase.auth.signOut();
                    router.push("/");
                  }}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Componente reutilizável para os botões do menu (modo desktop)
function NavLinks({ isActive }: { isActive: (path: string) => boolean }) {
  return (
    <>
      <Button
        variant={
          isActive("/dashboard") &&
          !isActive("/dashboard/patients") &&
          !isActive("/dashboard/appointments") &&
          !isActive("/dashboard/finances")
            ? "default"
            : "ghost"
        }
        size="sm"
        asChild
      >
        <Link href="/dashboard">
          <BarChart3 className="mr-2 h-4 w-4" /> Dashboard
        </Link>
      </Button>
      <Button
        variant={isActive("/dashboard/patients") ? "default" : "ghost"}
        size="sm"
        asChild
      >
        <Link href="/dashboard/patients">
          <Users className="mr-2 h-4 w-4" /> Patients
        </Link>
      </Button>
      <Button
        variant={isActive("/dashboard/appointments") ? "default" : "ghost"}
        size="sm"
        asChild
      >
        <Link href="/dashboard/appointments">
          <Calendar className="mr-2 h-4 w-4" /> Appointments
        </Link>
      </Button>
      <Button
        variant={isActive("/dashboard/finances") ? "default" : "ghost"}
        size="sm"
        asChild
      >
        <Link href="/dashboard/finances">
          <CreditCard className="mr-2 h-4 w-4" /> Finances
        </Link>
      </Button>
      <Button
        variant={isActive("/dashboard/treatment-plans") ? "default" : "ghost"}
        size="sm"
        asChild
      >
        <Link href="/dashboard/treatment-plans">
          <ClipboardList className="mr-2 h-4 w-4" /> Treatment Plans
        </Link>
      </Button>
    </>
  );
}
