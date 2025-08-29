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
import { SelectOption } from "@/types/jobTypes"
import { JobFormProps } from "@/types/pageProps"

export default function JobFormModal({
    cardTitle,
    formParms
}: JobFormProps) {

    return (
        <Card className="popup">
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Titulo</p>
                <Input
                    type="text"
                    value={formParms.title}
                    onChange={(e) => formParms.setTitle(e.target.value)}
                    placeholder="Frontend develop..." />

                <p>Link</p>
                <Input
                    type="text"
                    value={formParms.link}
                    onChange={(e) => formParms.setLink(e.target.value)}
                    placeholder="http://www.minhaVaga.com" />

                <p>Empresa</p>
                <Input
                    type="text"
                    value={formParms.enterprise}
                    onChange={(e) => formParms.setEnterprise(e.target.value)}
                    placeholder="TrackerVegas" />

                <p>Localização</p>
                <Input
                    type="text"
                    value={formParms.locationValue!}
                    onChange={(e) => formParms.setLocation(e.target.value)}
                    placeholder="TrackerVegas" />

                <p>Salário</p>
                <Input
                    type="number"
                    value={formParms.salaryValue!}
                    onChange={(e) => formParms.setSalary(Number(e.target.value))}
                    placeholder="TrackerVegas" />

                <p>Carga horaria</p>
                <Input
                    type="number"
                    value={formParms.workloadValue!}
                    onChange={(e) => formParms.setWorkload(Number(e.target.value))}
                    placeholder="TrackerVegas" />

                <div className="grid md:grid-cols-2">
                    <div>
                        <span>Status</span>
                        {
                            <Select value={formParms.statusId} onValueChange={(value) => formParms.setStatusId(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {formParms.status?.data?.map((statusItem: SelectOption) => (
                                        <SelectItem key={statusItem.id} value={String(statusItem.id)}>
                                            {statusItem.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        }
                    </div>

                    <div>
                        <span>Nível de interesse</span>
                        {
                            <Select value={formParms.interestLevelId!} onValueChange={(value) => formParms.setIterestLevelId(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {formParms.interestLevel?.data?.map((interestLevelItem: SelectOption) => (
                                        <SelectItem key={interestLevelItem.id} value={String(interestLevelItem.id)}>
                                            {interestLevelItem.name === 'Neutro' ? interestLevelItem.name + '😐' : interestLevelItem.name === 'Pouco Interessado' ? interestLevelItem.name + '🙂' : interestLevelItem.name + '🔥'}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        }
                    </div>

                    <div>
                        <span>Tipo de contrato</span>
                        {
                            <Select value={formParms.typeOfContractId!} onValueChange={(value) => formParms.setTypeOfContractId(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {formParms.typeOfContract?.data?.map((typeOfContractItem: SelectOption) => (
                                        <SelectItem key={typeOfContractItem.id} value={String(typeOfContractItem.id)}>
                                            {typeOfContractItem.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        }
                    </div>

                    <div>
                        <span>Modalidade</span>
                        <Select value={formParms.modalityId} onValueChange={(value) => formParms.setModalityId(value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Modalidade" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    formParms.modality?.data?.map((modalityItem: SelectOption) => (
                                        <SelectItem key={modalityItem.id} value={modalityItem.id}>
                                            {modalityItem.name}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    disabled={formParms.loading}
                    onClick={formParms.onSubmit} type="button" className="w-full">
                    {formParms.loading ? "Salvando..." : "Salvar"}
                </Button>
            </CardFooter>
        </Card>
    )
}