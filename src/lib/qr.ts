import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";

export const GET = async () => {
    const doc = new PDFDocument();

    // Initial setup
    // doc.fillColor('red')
    // .translate(-100, -50)
    // .scale(0.8);

    // // Draw the path with the non-zero winding rule
    // doc.path('M 250,75 L 323,301 131,161 369,161 177,301 z')
    // .fill('non-zero');

    // // Draw the path with the even-odd winding rule
    // doc.translate(280, 0)
    // .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
    // .fill('even-odd');

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

    doc.end();

    return new Response(doc as any);
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