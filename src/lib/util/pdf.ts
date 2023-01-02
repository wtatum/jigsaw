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

    const SCALE = 3.75;
    const LEFT = 3;
    const TOP = 3; //7;
    const SPACE = 40;
    const COL = 4;
    const ROW = 5;
    
    const BASE = `https://jigsaw-raleigh.netlify.app/p`

    doc.scale(SCALE);
    doc.translate(LEFT, TOP);

    for (let i=0; i<ROW; i++) {
        for (let j=0; j<COL; j++) {
            const url = `${window.origin}/${uuidv4()}`;
            await drawQR(doc, `${BASE}/${uuidv4()}`);
            doc.translate(SPACE, 0);
        }
        doc.translate(-COL * SPACE, SPACE);
    }
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