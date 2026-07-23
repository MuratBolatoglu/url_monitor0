import { Cog, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select";
import api from "@/services/api";
import type { Monitor } from "@/types/Monitor";
import { useEffect, useState } from "react";

type AddMonitorDialogProps = {
    onSuccess: () => Promise<void>;
    mode: "add" | "edit";
    monitor?: Monitor;
};

function AddMonitorDialog({
    onSuccess,
    mode,
    monitor,
}: AddMonitorDialogProps) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [monitorType, setMonitorType] = useState("HTTP");
    const [method, setMethod] = useState("GET");
    const [expectedStatus, setExpectedStatus] = useState("200");
    const [timeout, setTimeout] = useState("");
    const [interval, setInterval] = useState("");
    const [requestBody, setRequestBody] = useState("");
    const [requestHeaders, setRequestHeaders] = useState("");
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        if (open && mode === "edit" && monitor) {
            setName(monitor.nameVar ?? "");
            setUrl(monitor.urlVar ?? "");
            setMonitorType(monitor.monitor_type_var ?? "HTTP");
            setMethod(monitor.http_method_var ?? "GET");
            setExpectedStatus(String(monitor.expectedCodeVar ?? 200));
            setTimeout(String(monitor.timeoutVar ?? ""));
            setInterval(String(monitor.intervalSecondsVar ?? ""));
            setRequestBody(monitor.requestBodyVar ?? "");
            setRequestHeaders(monitor.requestHeadersVar ?? "");
            setKeyword(monitor.keyword_var ?? "");
        }
    }, [open, mode, monitor]);

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

    async function handleDialog() {
        if (mode === "add") {
            await createMonitor();
        } else {
            await editMonitor(monitor);
        }
    }

    async function editMonitor(currentMonitor?: Monitor) {
        if (!currentMonitor) return;

        try {
            setLoading(true);

            await api.put(`/monitors/${currentMonitor.id_var}`, {
                monitor_name: name,
                monitor_url: url,
                monitor_type: monitorType,
                method,
                keyword,
                expected_status_code: Number(expectedStatus),
                timeout: Number(timeout),
                interval_seconds: Number(interval),
                request_body: requestBody,
                request_headers: requestHeaders,
            });

            await onSuccess();
            setOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function createMonitor() {
        try {
            setLoading(true);

            await api.post("/monitors", {
                monitor_name: name,
                monitor_url: url,
                monitor_type: monitorType,
                method,
                keyword,
                expected_status_code: Number(expectedStatus),
                timeout: Number(timeout),
                interval_seconds: Number(interval),
                request_body: requestBody,
                request_headers: requestHeaders,
            });

            await onSuccess();
            resetForm();
            setOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const inputClassName =
        "h-11 border-slate-700 bg-slate-950 text-slate-100 placeholder:text-slate-600 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20";

    const selectClassName =
        "h-11 w-full border-slate-700 bg-slate-950 text-slate-100";

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    mode === "add" ? (
                        <Button
                            size="icon"
                            className="bg-indigo-600 text-white hover:bg-indigo-500"
                            aria-label="Add monitor"
                        >
                            <Plus className="size-4" />
                        </Button>
                    ) : (
                        <Button
                            size="icon"
                            variant="outline"
                            className="border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                            aria-label="Edit monitor"
                        >
                            <Cog className="size-4" />
                        </Button>
                    )
                }
            />

            <DialogContent className="max-h-[90vh] overflow-y-auto border-slate-800 bg-slate-900 text-slate-100 sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl text-white">
                        {mode === "add"
                            ? "Add Monitor"
                            : "Edit Monitor"}
                    </DialogTitle>

                    <p className="text-sm text-slate-400">
                        {mode === "add"
                            ? "Create a new monitor and configure its check settings."
                            : "Update the selected monitor configuration."}
                    </p>
                </DialogHeader>

                <div className="mt-3 space-y-6">
                    <FormSection
                        title="General Information"
                        description="Basic monitor information and type."
                    >
                        <FormField label="Monitor Name">
                            <Input
                                placeholder="Production API"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                disabled={loading}
                                className={inputClassName}
                            />
                        </FormField>

                        <FormField label="URL or Host">
                            <Input
                                placeholder="https://example.com"
                                value={url}
                                onChange={(event) =>
                                    setUrl(event.target.value)
                                }
                                disabled={loading}
                                className={inputClassName}
                            />
                        </FormField>

                        <FormField label="Monitor Type">
                            <NativeSelect
                                value={monitorType}
                                onChange={(event) =>
                                    setMonitorType(event.target.value)
                                }
                                disabled={loading}
                                className={selectClassName}
                            >
                                <NativeSelectOption value="HTTP">
                                    HTTP
                                </NativeSelectOption>

                                <NativeSelectOption value="PING">
                                    PING
                                </NativeSelectOption>

                                <NativeSelectOption value="DNS">
                                    DNS
                                </NativeSelectOption>
                            </NativeSelect>
                        </FormField>
                    </FormSection>

                    {monitorType === "HTTP" && (
                        <FormSection
                            title="HTTP Configuration"
                            description="Configure the request and expected response."
                        >
                            <div className="grid gap-4 sm:grid-cols-2">
                                <FormField label="HTTP Method">
                                    <NativeSelect
                                        value={method}
                                        onChange={(event) =>
                                            setMethod(event.target.value)
                                        }
                                        disabled={loading}
                                        className={selectClassName}
                                    >
                                        <NativeSelectOption value="GET">
                                            GET
                                        </NativeSelectOption>

                                        <NativeSelectOption value="POST">
                                            POST
                                        </NativeSelectOption>

                                        <NativeSelectOption value="PUT">
                                            PUT
                                        </NativeSelectOption>

                                        <NativeSelectOption value="PATCH">
                                            PATCH
                                        </NativeSelectOption>

                                        <NativeSelectOption value="DELETE">
                                            DELETE
                                        </NativeSelectOption>

                                        <NativeSelectOption value="HEAD">
                                            HEAD
                                        </NativeSelectOption>

                                        <NativeSelectOption value="OPTIONS">
                                            OPTIONS
                                        </NativeSelectOption>
                                    </NativeSelect>
                                </FormField>

                                <FormField label="Expected Status">
                                    <Input
                                        type="number"
                                        placeholder="200"
                                        value={expectedStatus}
                                        onChange={(event) =>
                                            setExpectedStatus(
                                                event.target.value
                                            )
                                        }
                                        disabled={loading}
                                        className={inputClassName}
                                    />
                                </FormField>
                            </div>

                            <FormField label="Keyword">
                                <Input
                                    placeholder="Optional response keyword"
                                    value={keyword}
                                    onChange={(event) =>
                                        setKeyword(event.target.value)
                                    }
                                    disabled={loading}
                                    className={inputClassName}
                                />
                            </FormField>

                            <FormField label="Request Headers">
                                <Textarea
                                    placeholder={`{"Authorization": "Bearer token"}`}
                                    value={requestHeaders}
                                    onChange={(event) =>
                                        setRequestHeaders(
                                            event.target.value
                                        )
                                    }
                                    disabled={loading}
                                    className="min-h-24 border-slate-700 bg-slate-950 font-mono text-sm text-slate-100 placeholder:text-slate-600 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20"
                                />
                            </FormField>

                            {["POST", "PUT", "PATCH"].includes(method) && (
                                <FormField label="Request Body">
                                    <Textarea
                                        placeholder={`{"name": "example"}`}
                                        value={requestBody}
                                        onChange={(event) =>
                                            setRequestBody(
                                                event.target.value
                                            )
                                        }
                                        disabled={loading}
                                        className="min-h-28 border-slate-700 bg-slate-950 font-mono text-sm text-slate-100 placeholder:text-slate-600 focus-visible:border-indigo-500 focus-visible:ring-indigo-500/20"
                                    />
                                </FormField>
                            )}
                        </FormSection>
                    )}

                    <FormSection
                        title="Timing Settings"
                        description="Set request timeout and check frequency."
                    >
                        <div className="grid gap-4 sm:grid-cols-2">
                            <FormField label="Timeout">
                                <div className="relative">
                                    <Input
                                        type="number"
                                        placeholder="5000"
                                        value={timeout}
                                        onChange={(event) =>
                                            setTimeout(event.target.value)
                                        }
                                        disabled={loading}
                                        className={`${inputClassName} pr-12`}
                                    />

                                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                                        ms
                                    </span>
                                </div>
                            </FormField>

                            <FormField label="Interval">
                                <div className="relative">
                                    <Input
                                        type="number"
                                        placeholder="60"
                                        value={interval}
                                        onChange={(event) =>
                                            setInterval(
                                                event.target.value
                                            )
                                        }
                                        disabled={loading}
                                        className={`${inputClassName} pr-16`}
                                    />

                                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                                        seconds
                                    </span>
                                </div>
                            </FormField>
                        </div>
                    </FormSection>
                </div>

                <div className="mt-2 flex justify-end gap-3 border-t border-slate-800 pt-5">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={loading}
                        onClick={() => setOpen(false)}
                        className="border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                        Cancel
                    </Button>

                    <Button
                        disabled={loading}
                        type="button"
                        onClick={handleDialog}
                        className="min-w-36 bg-indigo-600 text-white hover:bg-indigo-500"
                    >
                        {loading && (
                            <Loader2 className="mr-2 size-4 animate-spin" />
                        )}

                        {loading
                            ? mode === "add"
                                ? "Creating..."
                                : "Saving..."
                            : mode === "add"
                              ? "Create Monitor"
                              : "Save Changes"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

type FormSectionProps = {
    title: string;
    description: string;
    children: React.ReactNode;
};

function FormSection({
    title,
    description,
    children,
}: FormSectionProps) {
    return (
        <section className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
            <div className="mb-4">
                <h3 className="font-semibold text-slate-200">
                    {title}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                    {description}
                </p>
            </div>

            <div className="space-y-4">
                {children}
            </div>
        </section>
    );
}

type FormFieldProps = {
    label: string;
    children: React.ReactNode;
};

function FormField({
    label,
    children,
}: FormFieldProps) {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
                {label}
            </label>

            {children}
        </div>
    );
}

export default AddMonitorDialog;