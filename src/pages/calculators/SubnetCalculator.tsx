import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CalculatorLayout from '@/components/calculator/CalculatorLayout';
import { getCalculatorById } from '@/lib/calculators';

const SubnetCalculator = () => {
  const calculator = getCalculatorById('subnet')!;
  
  const [ipAddress, setIpAddress] = useState('192.168.1.0');
  const [cidr, setCidr] = useState('24');
  const [result, setResult] = useState<{
    networkAddress: string;
    broadcastAddress: string;
    subnetMask: string;
    wildcardMask: string;
    totalHosts: number;
    usableHosts: number;
    firstHost: string;
    lastHost: string;
    ipClass: string;
  } | null>(null);

  const ipToNumber = (ip: string): number => {
    const parts = ip.split('.').map(Number);
    return (parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3];
  };

  const numberToIp = (num: number): string => {
    return [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255
    ].join('.');
  };

  const calculate = () => {
    const ipParts = ipAddress.split('.').map(Number);
    const cidrNum = parseInt(cidr);

    if (ipParts.length !== 4 || ipParts.some(p => isNaN(p) || p < 0 || p > 255)) return;
    if (isNaN(cidrNum) || cidrNum < 0 || cidrNum > 32) return;

    const subnetMaskNum = cidrNum === 0 ? 0 : (0xFFFFFFFF << (32 - cidrNum)) >>> 0;
    const wildcardMaskNum = ~subnetMaskNum >>> 0;
    const ipNum = ipToNumber(ipAddress);
    const networkNum = (ipNum & subnetMaskNum) >>> 0;
    const broadcastNum = (networkNum | wildcardMaskNum) >>> 0;

    const totalHosts = Math.pow(2, 32 - cidrNum);
    const usableHosts = cidrNum <= 30 ? totalHosts - 2 : (cidrNum === 31 ? 2 : 1);

    let ipClass: string;
    if (ipParts[0] < 128) ipClass = 'A';
    else if (ipParts[0] < 192) ipClass = 'B';
    else if (ipParts[0] < 224) ipClass = 'C';
    else if (ipParts[0] < 240) ipClass = 'D (Multicast)';
    else ipClass = 'E (Reserved)';

    setResult({
      networkAddress: numberToIp(networkNum),
      broadcastAddress: numberToIp(broadcastNum),
      subnetMask: numberToIp(subnetMaskNum),
      wildcardMask: numberToIp(wildcardMaskNum),
      totalHosts,
      usableHosts: Math.max(0, usableHosts),
      firstHost: cidrNum < 31 ? numberToIp(networkNum + 1) : numberToIp(networkNum),
      lastHost: cidrNum < 31 ? numberToIp(broadcastNum - 1) : numberToIp(broadcastNum),
      ipClass,
    });
  };

  const reset = () => {
    setIpAddress('192.168.1.0');
    setCidr('24');
    setResult(null);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      title="Subnet Calculator"
      description="Calculate IP subnet masks, network addresses, and host ranges for network planning."
      intro="Enter an IP address and CIDR notation to calculate subnet information including network range, hosts, and masks."
      formula="Network Address = IP AND Subnet Mask | Broadcast = Network OR Wildcard"
      example="192.168.1.0/24 → Network: 192.168.1.0, Broadcast: 192.168.1.255, Usable: 254 hosts"
      faqs={[
        { question: 'What is CIDR notation?', answer: 'CIDR (like /24) indicates how many bits are used for the network portion. /24 means 24 network bits, leaving 8 for hosts (256 addresses).' },
        { question: 'Why are usable hosts less than total?', answer: 'The first address is the network address and the last is the broadcast address. These cannot be assigned to hosts.' },
        { question: 'What is a wildcard mask?', answer: 'The inverse of the subnet mask, used in access control lists (ACLs) on routers.' },
      ]}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="ipAddress" className="mb-2 block">IP Address</Label>
          <Input
            id="ipAddress"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            placeholder="192.168.1.0"
            className="calc-input font-mono"
          />
        </div>
        <div>
          <Label className="mb-2 block">CIDR / Subnet Mask</Label>
          <Select value={cidr} onValueChange={setCidr}>
            <SelectTrigger className="calc-input font-mono">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 33 }, (_, i) => i).map((c) => (
                <SelectItem key={c} value={c.toString()} className="font-mono">
                  /{c} ({Math.pow(2, 32 - c)} hosts)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={calculate} className="calc-btn flex-1">Calculate</Button>
        <Button onClick={reset} variant="outline" className="calc-btn-secondary">Reset</Button>
      </div>

      {result && (
        <div className="calc-result animate-scale-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Network Address</p>
              <p className="text-lg font-bold font-mono text-foreground">{result.networkAddress}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Broadcast Address</p>
              <p className="text-lg font-bold font-mono text-foreground">{result.broadcastAddress}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Subnet Mask</p>
              <p className="text-lg font-bold font-mono text-foreground">{result.subnetMask}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Wildcard Mask</p>
              <p className="text-lg font-bold font-mono text-foreground">{result.wildcardMask}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-1">First Host</p>
              <p className="text-lg font-bold font-mono text-foreground">{result.firstHost}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Last Host</p>
              <p className="text-lg font-bold font-mono text-foreground">{result.lastHost}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Usable Hosts</p>
              <p className="calc-result-value text-xl">{result.usableHosts.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">IP Class</p>
              <p className="text-lg font-bold text-foreground">{result.ipClass}</p>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
};

export default SubnetCalculator;
