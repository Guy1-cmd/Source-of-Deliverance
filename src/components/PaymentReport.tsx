import React from 'react';
import { Download, FileText, Printer, Calendar, DollarSign, User, CreditCard, CheckCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow, WidthType, AlignmentType, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';

interface PaymentData {
  memberEmail: string;
  memberName: string;
  paymentType: string;
  amount: string;
  paymentMethod: string;
  cardNumber?: string;
  mobileNumber?: string;
  reference?: string;
  notes?: string;
  transactionId: string;
  timestamp: string;
}

interface PaymentReportProps {
  paymentData: PaymentData;
  onClose: () => void;
}

const PaymentReport: React.FC<PaymentReportProps> = ({ paymentData, onClose }) => {
  const reportRef = React.useRef<HTMLDivElement>(null);

  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case 'card': return 'Credit/Debit Card';
      case 'mobile': return 'Mobile Money';
      case 'bank': return 'Bank Transfer';
      default: return method;
    }
  };

  const formatCardNumber = (cardNumber: string) => {
    if (!cardNumber) return '';
    return '**** **** **** ' + cardNumber.slice(-4);
  };

  const generatePDF = async () => {
    if (!reportRef.current) return;

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`Payment_Receipt_${paymentData.transactionId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const generateWord = async () => {
    try {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              // Header
              new Paragraph({
                children: [
                  new TextRun({
                    text: "SOURCE OF DELIVERANCE CHURCH",
                    bold: true,
                    size: 32,
                    color: "1E40AF"
                  })
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 }
              }),
              
              new Paragraph({
                children: [
                  new TextRun({
                    text: "PAYMENT RECEIPT",
                    bold: true,
                    size: 24,
                    color: "059669"
                  })
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 }
              }),

              // Transaction Details
              new Paragraph({
                children: [
                  new TextRun({
                    text: "TRANSACTION DETAILS",
                    bold: true,
                    size: 20,
                    color: "374151"
                  })
                ],
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 200, after: 200 }
              }),

              // Details Table
              new Table({
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: "Transaction ID:", bold: true })] })],
                        width: { size: 30, type: WidthType.PERCENTAGE }
                      }),
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: paymentData.transactionId })] })],
                        width: { size: 70, type: WidthType.PERCENTAGE }
                      })
                    ]
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: "Date & Time:", bold: true })] })]
                      }),
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: paymentData.timestamp })] })]
                      })
                    ]
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: "Member Name:", bold: true })] })]
                      }),
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: paymentData.memberName })] })]
                      })
                    ]
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: "Email:", bold: true })] })]
                      }),
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: paymentData.memberEmail })] })]
                      })
                    ]
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: "Payment Type:", bold: true })] })]
                      }),
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: paymentData.paymentType === 'tithe' ? 'Tithe' : 'Offering' })] })]
                      })
                    ]
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: "Amount:", bold: true })] })]
                      }),
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: `$${paymentData.amount}` })] })]
                      })
                    ]
                  }),
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: "Payment Method:", bold: true })] })]
                      }),
                      new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: formatPaymentMethod(paymentData.paymentMethod) })] })]
                      })
                    ]
                  })
                ]
              }),

              // Footer
              new Paragraph({
                children: [
                  new TextRun({
                    text: "\n\nThank you for your generous contribution to Source of Deliverance Church. May God bless you abundantly!",
                    italics: true,
                    size: 20
                  })
                ],
                alignment: AlignmentType.CENTER,
                spacing: { before: 400 }
              }),

              new Paragraph({
                children: [
                  new TextRun({
                    text: '"Give, and it will be given to you. A good measure, pressed down, shaken together and running over" - Luke 6:38',
                    italics: true,
                    size: 18,
                    color: "059669"
                  })
                ],
                alignment: AlignmentType.CENTER,
                spacing: { before: 200 }
              })
            ]
          }
        ]
      });

      const buffer = await Packer.toBuffer(doc);
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      saveAs(blob, `Payment_Receipt_${paymentData.transactionId}.docx`);
    } catch (error) {
      console.error('Error generating Word document:', error);
      alert('Error generating Word document. Please try again.');
    }
  };

  const printReport = () => {
    if (!reportRef.current) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const reportHTML = reportRef.current.innerHTML;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Payment Receipt - ${paymentData.transactionId}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              color: #333;
            }
            .print-header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #1E40AF;
              padding-bottom: 20px;
            }
            .print-content {
              max-width: 800px;
              margin: 0 auto;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          <div class="print-content">
            ${reportHTML}
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-green-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Payment Receipt</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div ref={reportRef} className="p-8 bg-white">
          {/* Church Header */}
          <div className="text-center mb-8 border-b-2 border-blue-800 pb-6">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">SOURCE OF DELIVERANCE CHURCH</h1>
            <p className="text-gray-600 text-lg">123 Faith Avenue, Hope City, HC 12345</p>
            <p className="text-gray-600">Phone: (555) 123-4567 | Email: info@sourceofdeliverance.org</p>
          </div>

          {/* Receipt Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-green-600 mb-2">PAYMENT RECEIPT</h2>
            <div className="flex justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          {/* Transaction Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Member Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-semibold">{paymentData.memberName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-semibold">{paymentData.memberEmail}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  Payment Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold capitalize">
                      {paymentData.paymentType === 'tithe' ? 'Tithe' : 'Offering'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-bold text-green-600 text-xl">${paymentData.amount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-yellow-600" />
                  Transaction Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="font-semibold">{paymentData.transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date & Time:</span>
                    <span className="font-semibold">{paymentData.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
                  Payment Method
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Method:</span>
                    <span className="font-semibold">{formatPaymentMethod(paymentData.paymentMethod)}</span>
                  </div>
                  {paymentData.paymentMethod === 'card' && paymentData.cardNumber && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Card:</span>
                      <span className="font-semibold">{formatCardNumber(paymentData.cardNumber)}</span>
                    </div>
                  )}
                  {paymentData.paymentMethod === 'mobile' && paymentData.mobileNumber && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mobile:</span>
                      <span className="font-semibold">{paymentData.mobileNumber}</span>
                    </div>
                  )}
                  {paymentData.paymentMethod === 'bank' && paymentData.reference && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reference:</span>
                      <span className="font-semibold">{paymentData.reference}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {paymentData.notes && (
            <div className="bg-gray-50 p-4 rounded-lg mb-8">
              <h3 className="font-bold text-gray-800 mb-2">Additional Notes:</h3>
              <p className="text-gray-700 italic">{paymentData.notes}</p>
            </div>
          )}

          {/* Footer Message */}
          <div className="text-center border-t-2 border-gray-200 pt-6">
            <p className="text-lg text-gray-700 mb-4">
              Thank you for your generous contribution to Source of Deliverance Church.
            </p>
            <p className="text-xl font-bold text-green-600 mb-2">
              May God bless you abundantly!
            </p>
            <p className="text-gray-600 italic">
              "Give, and it will be given to you. A good measure, pressed down, shaken together and running over" - Luke 6:38
            </p>
          </div>

          {/* Church Contact Footer */}
          <div className="text-center mt-6 text-sm text-gray-500 border-t border-gray-200 pt-4">
            <p>For any questions regarding this transaction, please contact us at (555) 123-4567</p>
            <p>This is an official receipt from Source of Deliverance Church</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-50 p-6 rounded-b-2xl border-t">
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={generatePDF}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <FileText className="w-5 h-5 mr-2" />
              Download PDF
            </button>
            
            <button
              onClick={generateWord}
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Word
            </button>
            
            <button
              onClick={printReport}
              className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <Printer className="w-5 h-5 mr-2" />
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReport;