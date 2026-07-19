import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
function MonitorCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Google</CardTitle>
            </CardHeader>
            <CardContent>
                <p>https://google.com</p>
                <p className="text-green-500 font-semibold">UP</p>
            </CardContent>
        </Card>
    );
}

export default MonitorCard;