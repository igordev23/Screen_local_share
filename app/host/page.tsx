"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Monitor, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Peer from "peerjs";
import { useEffect, useState } from "react";
import { ShareOptions } from "./_components/ShareOptions";

export default function HostPage() {
  const [roomId, setRoomId] = useState("");
  const [peer, setPeer] = useState<Peer | null>(null);
  const [activeStream, setActiveStream] = useState<MediaStream | null>(null);
  const [connections, setConnections] = useState<string[]>([]);
  const { toast } = useToast();
  const router = useRouter();


  function generateShortId(length = 6) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
      id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
  }
  

  useEffect(() => {
    try {
      const shortId = generateShortId(6);
      const newPeer = new Peer(shortId, { debug: 2 });
      setPeer(newPeer);
      setRoomId(shortId);
  
      newPeer.on("connection", (connection) => {
        setConnections((prev) => [...prev, connection.peer]);
  
        connection.on("close", () => {
          setConnections((prev) =>
            prev.filter((peerId) => peerId !== connection.peer)
          );
        });
      });
  
      return () => {
        newPeer.destroy();
      };
    } catch (error) {
      console.error("Erro ao inicializar o peer:", error);
    }
  }, []);
  
  useEffect(() => {
    if (!peer) return;

    if (!activeStream && connections.length > 0) {
      toast({
        title: "Novo visualizador conectado",
        description: "Clique para começar a compartilhar sua tela.",
        duration: Infinity,
        action: (
          <ToastAction
            altText="Iniciar compartilhamento"
            onClick={async () => {
              try {
                const stream = await navigator.mediaDevices.getDisplayMedia({
                  video: true,
                  audio: true
                });
                setActiveStream(stream);
              } catch (err) {
                console.error("Erro ao compartilhar a tela:", err);
                toast({
                  title: "Erro no compartilhamento",
                  description:
                    "Não foi possível iniciar o compartilhamento de tela. Tente novamente.",
                  variant: "destructive"
                });
              }
            }}
          >
            Iniciar Compartilhamento
          </ToastAction>
        )
      });
    } else if (activeStream) {
      connections.forEach((connection) => {
        const call = peer.call(connection, activeStream);

        activeStream.getTracks()[0].onended = () => {
          call.close();
          activeStream.getTracks().forEach((track) => track.stop());
        };
      });
    }
  }, [peer, toast, activeStream, connections]);

  function endSession() {
    if (activeStream) {
      activeStream.getTracks().forEach((track) => track.stop());
      setActiveStream(null);
    }

    if (peer) {
      peer.destroy();
      setPeer(null);
    }

    setConnections([]);
    setRoomId("");

    toast({
      title: "Sessão encerrada",
      description: "O compartilhamento de tela foi encerrado."
    });

    router.push("/");
  }

  return (
    <div className="py-8 px-4 min-h-screen bg-gray-50 dark:bg-black">
      <div className="max-w-2xl mx-auto space-y-8">
        <Button variant="outline" asChild className="text-[#1E1E1E]">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar para o Início
          </Link>
        </Button>

        <Card className="shadow-xl border-2 border-[#8DC63F]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#00B1B0]">
              <Monitor className="h-6 w-6" />
              Compartilhamento de Tela
            </CardTitle>
            <CardDescription className="text-[#1E1E1E]">
              Compartilhe seu código ou link com outras pessoas para permitir
              que visualizem sua tela. Para compartilhar áudio, use o Chrome ou
              Edge e selecione a opção de compartilhar uma aba. Certifique-se de que todos estejam conectados na mesma rede Wi-Fi.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <ShareOptions roomId={roomId} />

            <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#1E1E1E]" />
                <span className="text-sm text-[#1E1E1E]">
                  Visualizadores Atuais
                </span>
              </div>
              <span className="text-lg font-semibold text-[#1E1E1E]">
                {connections.length}
              </span>
            </div>

            {activeStream && (
              <div className="flex justify-end pt-4">
                <Button
                  variant="destructive"
                  onClick={endSession}
                  className="flex items-center gap-2"
                >
                  Encerrar Compartilhamento
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
