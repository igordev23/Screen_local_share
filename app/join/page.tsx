"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Users } from "lucide-react";
import Link from "next/link";
import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";

export default function JoinPage() {
  const [roomId, setRoomId] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeStream, setActiveStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomFromUrl = params.get("room");
    if (roomFromUrl) {
      setRoomId(roomFromUrl);
    }

    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
        peerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && activeStream) {
      videoRef.current.srcObject = activeStream;
      videoRef.current.play().catch(console.error);
    }
  }, [activeStream]);

  function joinRoom(roomIdToJoin: string = roomId) {
    if (!roomIdToJoin.trim()) {
      toast({
        title: "Código da sala necessário",
        description: "Digite um código de sala válido.",
        variant: "destructive"
      });
      return;
    }

    setIsConnecting(true);

    const peer = new Peer({ debug: 2 });
    peerRef.current = peer;

    peer.on("open", () => {
      const connection = peer.connect(roomIdToJoin);

      connection.on("open", () => {
        toast({
          title: "Conectado!",
          description: "Aguardando o anfitrião iniciar o compartilhamento..."
        });
      });

      peer.on("call", (call) => {
        call.answer();
        call.on("stream", (remoteStream) => {
          setActiveStream(remoteStream);
        });
      });

      connection.on("close", () => {
        setIsConnecting(false);
        setRoomId("");
        setActiveStream(null);
        toast({
          title: "Desconectado",
          description: "A sessão foi encerrada.",
          variant: "destructive"
        });
      });
    });

    peer.on("error", (err) => {
      console.error("Erro do Peer:", err);
      setIsConnecting(false);
      toast({
        title: "Falha na conexão",
        description:
          "Não foi possível conectar à sala. Verifique o código e tente novamente.",
        variant: "destructive"
      });
    });
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
              <Users className="h-6 w-6" />
              Entrar em uma Sala
            </CardTitle>
            <CardDescription className="text-[#1E1E1E]">
              Digite o código da sala para visualizar a tela compartilhada.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {!activeStream ? (
              <div className="space-y-4">
                <Input
                  placeholder="Código da sala"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  disabled={isConnecting}
                  className="bg-white text-black"
                />
                <Button
                  className="w-full bg-[#8DC63F] hover:bg-[#7ab933] text-black"
                  onClick={() => joinRoom()}
                  disabled={isConnecting || !roomId.trim()}
                >
                  {isConnecting ? "Conectando..." : "Entrar na Sala"}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden group">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-contain"
                    autoPlay
                    playsInline
                    controls
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
