import type * as PDFKit from "pdfkit";
import PDFDocument from "pdfkit/js/pdfkit.standalone";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";

// The typings from standalone are funky
const Document = PDFDocument as unknown as PDFKit.PDFDocument;
type Doc = typeof PDFKit.default;

export const create = () => new Document({
    autoFirstPage: false
});

export const docToIframe = (doc: Doc, frame: HTMLIFrameElement) => {
    const parts: BlobPart[] = [];
    const onReadable = () => {
        let bytes: string | Buffer;
        while ((bytes = doc.read()) !== null) {
            parts.push(bytes);
        }
    };
    const onEnd = () => {
        const ourl = window.URL.createObjectURL(new Blob(parts, {
            type: "application/pdf"
        }));
        frame.src = ourl;
        doc.removeAllListeners();
    };
    
    doc.on('readable', onReadable);
    doc.on('end', onEnd);
};


export const qrcodeSheet = async (doc: Doc, pages: number) => {
    for(var i = 0; i < pages; i++) {
        await page(doc);
    }

    doc.end();
    return doc;
}

const page = async (doc: Doc) => {
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

const drawQR = async (doc: Doc, value: string) => {
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