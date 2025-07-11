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
import { GetAllStatus } from "./action";


export default function () {

    const { data:status, isLoading, isError } = GetAllStatus();

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
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
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