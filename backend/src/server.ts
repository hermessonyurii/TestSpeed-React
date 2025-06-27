import express from 'express';
import cors from 'cors';
// @ts-ignore
import speedTest from 'speedtest-net';

const app = express();
app.use(cors());

app.get('/api/speedtest', async (req, res) => {
  try {
    const result = await speedTest({ acceptLicense: true, acceptGdpr: true });
    res.json({
      ping: result.ping.latency,
      jitter: result.ping.jitter,
      download: (result.download.bandwidth * 8 / 1e6).toFixed(2),
      upload: (result.upload.bandwidth * 8 / 1e6).toFixed(2),
      packetLoss: result.packetLoss,
      isp: result.isp,
      interface: {
        internalIp: result.interface.internalIp,
        externalIp: result.interface.externalIp,
        macAddr: result.interface.macAddr,
        isVpn: result.interface.isVpn,
        name: result.interface.name
      },
      server: {
        id: result.server.id,
        name: result.server.name,
        location: result.server.location,
        country: result.server.country,
        host: result.server.host,
        port: result.server.port,
        ip: result.server.ip
      },
      resultUrl: result.result?.url
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
}); 