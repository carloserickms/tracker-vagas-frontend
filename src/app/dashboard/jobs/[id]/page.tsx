"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import DefaultNavBar from "@/components/DefaultNavBar";
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
import { GetAllModality, GetAllStatus } from "./action";


export default function () {

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
        <div>
            <DefaultNavBar />

            <Card>
                <CardHeader>
                    <CardTitle>Criar nova vaga</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Titulo</p>
                    <Input placeholder="Frontend develop..." />
                    <p>Link</p>
                    <Input placeholder="http://www.minhaVaga.com" />
                    <p>Empresa</p>
                    <Input placeholder="TrackerVegas" />
                    <div>
                        <span>Status</span>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    status?.data?.map((statusItem: any) => (
                                        <SelectItem key={statusItem.id} value={statusItem.name}>
                                            {statusItem.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <span>Modalidade</span>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Modalidade" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    modality?.data?.map((modalityItem: any) => (
                                        <SelectItem key={modalityItem.id} value={modalityItem.name}>
                                            {modalityItem.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">
                        salvar
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}