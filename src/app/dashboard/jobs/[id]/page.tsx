"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import DefaultNavBar from "@/components/DefaultNavBar";
import { useState } from "react";
import { JobPayload } from "@/types/jobTypes";
import { useRouter } from "next/navigation";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CreateNewJob, GetAllModality, GetAllStatus } from "./action";
import { JobInfoSchema } from "@/schemas/jobInfoSchema";


export default function () {

    const [title, setTitle] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [enterprise, setEnterprise] = useState<string>('');
    const [statusSelect, setStatus] = useState<string>('');
    const [modalitySelect, setmodality] = useState<string>('');
    const [loading, setLoading] = useState(false);

    let payload: JobPayload = {
        title: title,
        link: link,
        enterpriseName: enterprise,
        status: statusSelect,
        modality: modalitySelect
    }

    async function handleSubmit() {

        const validatedFields = JobInfoSchema.safeParse(payload)

        if (!validatedFields.success) {
            console.log(validatedFields.success)
            
            alert('Dados inseridos não são validos, verifique e tente novamente');
            return
        }

        setLoading(true);
        try {
            await CreateNewJob(payload);
            alert("Salvo Com Sucesso!");
        } catch (error) {
            alert("Erro ao Cadastrar.");
        } finally {
            setLoading(false);
        }
    }

    const {
        data: status,
        isLoading: isStatusLoading,
        isError: isStatusError,
    } = GetAllStatus();

    const {
        data: modality,
        isLoading: isModalityLoading,
        isError: isModalityError,
    } = GetAllModality();


    return (
        <div className="flex flex-col h-dvh overflow-y-hidden p-1 gap-1">
            <div className="flex justify-center h-[10%]">
                <DefaultNavBar />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Criar nova vaga</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Titulo</p>
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Frontend develop..." />

                    <p>Link</p>
                    <Input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="http://www.minhaVaga.com" />

                    <p>Empresa</p>
                    <Input
                        type="text"
                        value={enterprise}
                        onChange={(e) => setEnterprise(e.target.value)}
                        placeholder="TrackerVegas" />

                    <div>
                        <span>Status</span>
                        <Select onValueChange={(value) => setStatus(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    status?.data?.map((statusItem: any) => (
                                        <SelectItem key={statusItem.id} value={statusItem.id}>
                                            {statusItem.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <span>Modalidade</span>
                        <Select onValueChange={(value) => setmodality(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Modalidade" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    modality?.data?.map((modalityItem: any) => (
                                        <SelectItem key={modalityItem.id} value={modalityItem.id}>
                                            {modalityItem.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                    disabled={loading}
                    onClick={handleSubmit} type="button" className="w-full">
                        {loading ? "Salvando..." : "Salvar"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}