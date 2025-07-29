"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
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
import { JobFormCardProps } from "@/types/jobTypes"


export default function JobFormCard({
    cardTitle,
    title,
    setTitle,
    link,
    setLink,
    enterprise,
    setEnterprise,
    modality,
    setModality,
    modalityValue,
    status,
    setStatus,
    statusValue,
    loading,
    onSubmit,
}: JobFormCardProps) {

    return (
        <Card>
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
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
                    {
                        <Select value={statusValue} onValueChange={(value) => setStatus(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                {status?.data?.map((statusItem: any) => (
                                    <SelectItem key={statusItem.id} value={String(statusItem.id)}>
                                        {statusItem.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    }
                </div>

                <div>
                    <span>Modalidade</span>
                    <Select value={modalityValue} onValueChange={(value) => setModality(value)}>
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
                    onClick={onSubmit} type="button" className="w-full">
                    {loading ? "Salvando..." : "Salvar"}
                </Button>
            </CardFooter>
        </Card>
    );
}