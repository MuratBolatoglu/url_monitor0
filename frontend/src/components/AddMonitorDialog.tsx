import { Button } from "@/components/ui/button";
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react";
import { useState } from "react";
import {Input} from "@/components/ui/input";
import { NativeSelect,NativeSelectOption } from "./ui/native-select";
import api from "@/services/api";
import type { Monitor } from "@/types/Monitor";

type AddMonitorDialogProps = {
    onSuccess: () => Promise<void>;
    monitor?: Monitor;
};

function AddMonitorDialog({onSuccess} : AddMonitorDialogProps) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [name,setName] = useState("");
    const [url,setUrl] =useState("");
    const [monitorType,setMonitorType] = useState("HTTP");
    const [method, setMethod] = useState("GET");
    const [expectedStatus, setExpectedStatus] = useState("200");
    const [timeout, setTimeout] = useState("");
    const [interval,setInterval] = useState("")
    const [requestBody, setRequestBody] = useState("");
    const [requestHeaders, setRequestHeaders] = useState("");
    const [keyword, setKeyword] = useState("");

    function resetForm() {
    setName("");
    setUrl("");
    setMonitorType("HTTP");
    setMethod("GET");
    setExpectedStatus("200");
    setTimeout("");
    setInterval("");
    setRequestBody("");
    setRequestHeaders("");
    setKeyword("");
    }
    async function createMonitor(){
        try {
            setLoading(true);
            await api.post("/monitors",{
                monitor_name : name,
                monitor_url : url,
                monitor_type: monitorType,
                method: method,
                keyword : keyword,
                expected_status_code : Number(expectedStatus),
                timeout: Number(timeout),
                interval_seconds: Number(interval),
                request_body : requestBody,
                request_headers : requestHeaders
            })  
            await onSuccess();  
            resetForm();
        setOpen(false);
        } catch (error) {
            console.log(error);
        }finally {
            setLoading(false);
        }
            


    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button size="icon"><Plus /></Button>}/>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Monitor</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                <Input placeholder="Monitor Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <Input placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)}/>
                <NativeSelect className="w-full" value={monitorType} onChange={(e)=>setMonitorType(e.target.value)}>
                    <NativeSelectOption value="HTTP">HTTP</NativeSelectOption>
                    <NativeSelectOption value="PING">PING</NativeSelectOption>
                    <NativeSelectOption value="DNS">DNS</NativeSelectOption>
                </NativeSelect>
                {monitorType === "HTTP" && (
                    <>  
                        <NativeSelect className="w-full" value={method} onChange={(e)=>setMethod(e.target.value)}>
                            <NativeSelectOption value="GET">GET</NativeSelectOption>
                            <NativeSelectOption value="POST">POST</NativeSelectOption>
                            <NativeSelectOption value="PUT">PUT</NativeSelectOption>
                            <NativeSelectOption value="PATCH">PATCH</NativeSelectOption>
                            <NativeSelectOption value="DELETE">DELETE</NativeSelectOption>
                            <NativeSelectOption value="HEAD">HEAD</NativeSelectOption>
                            <NativeSelectOption value="OPTIONS">OPTIONS</NativeSelectOption>
                        </NativeSelect>
                        <Input placeholder="Expected Status"value={expectedStatus}onChange={(e) => setExpectedStatus(e.target.value)}/>
                        <Input placeholder="Keyword"value={keyword}onChange={(e) => setKeyword(e.target.value)}/>
                        <Textarea placeholder="Request Header"value={requestHeaders}onChange={(e) => setRequestHeaders(e.target.value)}/>

                    </>
                )}
                {monitorType === "HTTP" && (method === "PUT" || method === "PATCH" || method === "POST") && (
                    <>
                        <Textarea placeholder="Request Body"value={requestBody}onChange={(e) => setRequestBody(e.target.value)}/>
                    </>
                )}
                <Input placeholder="Timeout (ms)" value={timeout} onChange={(e)=>setTimeout(e.target.value)}/>
                <Input placeholder="Interval (seconds)" value={interval} onChange={(e)=>setInterval(e.target.value)}/>
                </div>
                <Button disabled={loading} className="w-full" type="button" onClick={()=>createMonitor()}>{loading ? "Creating..." : "Create Monitor"}</Button>
            </DialogContent>
        </Dialog>
    );
}

export default AddMonitorDialog;