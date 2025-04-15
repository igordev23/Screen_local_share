import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="py-12 px-4 bg-gradient-to-b from-white to-gray-100 text-[#1E1E1E] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Conecte e compartilhe em instantes
          </h1>
          <p className="text-xl text-gray-700">
            Crie uma sala, compartilhe o código e comece a apresentar em segundos, tudo localmente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Card className="hover:shadow-xl transition-shadow border border-[#8DC63F]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#8DC63F]">
                <Monitor className="h-6 w-6" />
                Iniciar Compartilhamento
              </CardTitle>
              <CardDescription className="text-gray-600">
                Crie uma sala e compartilhe sua tela com outras pessoas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/host">
                <Button className="w-full bg-[#8DC63F] hover:bg-[#7AB92E] text-white">
                  Criar Sala
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow border border-[#00B1B0]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#00B1B0]">
                <Users className="h-6 w-6" />
                Entrar em uma Sala
              </CardTitle>
              <CardDescription className="text-gray-600">
                Digite um código de sala para visualizar a tela de alguém
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/join">
                <Button
                  variant="outline"
                  className="w-full border-[#00B1B0] text-[#00B1B0] hover:bg-[#00B1B0]/10"
                >
                  Entrar na Sala
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
