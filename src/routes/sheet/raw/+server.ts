import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";

export const GET = async () => {
    return new Response(await doc(3) as any);
}

const doc = async (pages: number) => {
    const doc = new PDFDocument({
        autoFirstPage: false
    });

    for(var i = 0; i < pages; i++) {
        await page(doc);
    }

    doc.end();
    return doc;
}

const page = async (doc: typeof PDFDocument) => {
    doc.addPage();
    
    doc.scale(5);
    doc.translate(6, 6);
    await drawQR(doc, `https://example.com/${uuidv4()}`);
    doc.translate(38, 0);
    await drawQR(doc, `https://example.com/${uuidv4()}`);
    doc.translate(38, 0);
    await drawQR(doc, `https://example.com/${uuidv4()}`);

    doc.translate(-76, 38);
    await drawQR(doc, `https://example.com/${uuidv4()}`);
    doc.translate(38, 0);
    await drawQR(doc, `https://example.com/${uuidv4()}`);
    doc.translate(38, 0);
    await drawQR(doc, `https://example.com/${uuidv4()}`);

    doc.translate(-76, 38);
    await drawQR(doc, `https://example.com/${uuidv4()}`);
    doc.translate(38, 0);
    await drawQR(doc, `https://example.com/${uuidv4()}`);
    doc.translate(38, 0);
    await drawQR(doc, `https://example.com/${uuidv4()}`);
    
    doc.translate(-76, 38);
    await drawQR(doc, `https://example.com/${uuidv4()}`);
    doc.translate(38, 0);
    await drawQR(doc, `https://example.com/${uuidv4()}`);
    doc.translate(38, 0);
    await drawQR(doc, `https://example.com/${uuidv4()}`);
}

const drawQR = async (doc: typeof PDFDocument, value: string) => {
    const qr = await QRCode.toString(value, {
        type: "svg",
        margin: 0
    });

    // Assume the second match is the code (first is the border)

    // Get stroke values from XML string
    const [_, {groups}] =  qr.matchAll(/d=\"(?<path>[^\"]+)\"/g);
    const path = groups?.path;
    if(path) {
        doc.path(path).stroke();
    }
}