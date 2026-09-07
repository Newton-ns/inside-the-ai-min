import React from 'react';
import { ExtractedEntities } from '../../types';
import {
  Package, Factory, Scale, IndianRupee, Calendar, Tag,
  PhoneCall, Globe, Clock, CheckCircle2, AlertTriangle, XCircle
} from 'lucide-react';

interface EntityCardProps {
  label: string;
  icon: React.ReactNode;
  value: string | null | undefined;
  found: boolean;
  confidence?: number;
  required?: boolean;
  ruleCitation?: string;
}

const EntityCard: React.FC<EntityCardProps> = ({
  label, icon, value, found, confidence = 0, required = true, ruleCitation
}) => {
  const status = found ? (confidence > 0.85 ? 'high' : 'medium') : 'missing';

  return (
    <div className={`p-3 rounded-xl border text-xs transition-all ${
      status === 'missing' && required
        ? 'bg-rose-950/40 border-rose-700/40'
        : status === 'medium'
        ? 'bg-amber-950/30 border-amber-700/40'
        : 'bg-slate-950 border-slate-800'
    }`}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <span className={`${
            status === 'missing' ? 'text-rose-400' :
            status === 'medium' ? 'text-amber-400' : 'text-blue-400'
          }`}>{icon}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {ruleCitation && (
            <span className="text-[9px] font-mono text-slate-500">{ruleCitation}</span>
          )}
          {status === 'missing' ? (
            <XCircle className="w-3.5 h-3.5 text-rose-400" />
          ) : status === 'medium' ? (
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          )}
        </div>
      </div>

      {found && value ? (
        <>
          <p className="text-slate-200 font-medium leading-relaxed break-words">{value}</p>
          {confidence > 0 && (
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-[9px] text-slate-500">
                <span>OCR Confidence</span>
                <span className="font-mono">{Math.round(confidence * 100)}%</span>
              </div>
              <div className="conf-bar-track">
                <div
                  className={`conf-bar-fill ${confidence > 0.85 ? 'bg-emerald-500' : 'bg-amber-400'}`}
                  style={{ width: `${confidence * 100}%` }}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-rose-400 font-semibold italic text-[11px]">
          {required ? '⚠ Mandatory declaration missing' : '— Not declared'}
        </p>
      )}
    </div>
  );
};

interface OCREntityCardsProps {
  entities: ExtractedEntities;
}

export const OCREntityCards: React.FC<OCREntityCardsProps> = ({ entities }) => {
  return (
    <div className="space-y-3">
      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2 mb-3">
        Extracted Label Entities (NLP Parser Output)
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <EntityCard
          label="Product Name"
          icon={<Package className="w-3.5 h-3.5" />}
          value={entities.product_name?.value}
          found={entities.product_name?.found ?? false}
          confidence={entities.product_name?.confidence}
          required
          ruleCitation="Rule 6(1)(b)"
        />

        <EntityCard
          label="Manufacturer / Packer"
          icon={<Factory className="w-3.5 h-3.5" />}
          value={entities.manufacturer_name?.value}
          found={entities.manufacturer_name?.found ?? false}
          confidence={entities.manufacturer_name?.confidence}
          required
          ruleCitation="Rule 6(1)(a)"
        />

        <EntityCard
          label="Net Quantity"
          icon={<Scale className="w-3.5 h-3.5" />}
          value={entities.net_quantity?.value}
          found={entities.net_quantity?.found ?? false}
          confidence={entities.net_quantity?.confidence}
          required
          ruleCitation="Rule 6(1)(c)"
        />

        <EntityCard
          label="Maximum Retail Price (MRP)"
          icon={<IndianRupee className="w-3.5 h-3.5" />}
          value={entities.mrp?.value
            ? `${entities.mrp.value} ${entities.mrp.has_tax_clause ? '✓ (incl. of all taxes)' : '⚠ Missing tax clause'}`
            : null}
          found={entities.mrp?.found ?? false}
          confidence={entities.mrp?.found ? 0.97 : 0}
          required
          ruleCitation="Rule 6(1)(e)"
        />

        <EntityCard
          label="Mfg / Packing Date"
          icon={<Calendar className="w-3.5 h-3.5" />}
          value={entities.mfg_date?.value}
          found={entities.mfg_date?.found ?? false}
          confidence={entities.mfg_date?.found ? 0.94 : 0}
          required
          ruleCitation="Rule 6(1)(d)"
        />

        <EntityCard
          label="Expiry / Best Before"
          icon={<Clock className="w-3.5 h-3.5" />}
          value={entities.expiry_date?.value}
          found={entities.expiry_date?.found ?? false}
          confidence={entities.expiry_date?.found ? 0.91 : 0}
          required={false}
        />

        <EntityCard
          label="Batch / Lot Number"
          icon={<Tag className="w-3.5 h-3.5" />}
          value={entities.batch_number?.value}
          found={entities.batch_number?.found ?? false}
          confidence={entities.batch_number?.found ? 0.95 : 0}
          required={false}
        />

        <EntityCard
          label="Consumer Care (Helpline / Email)"
          icon={<PhoneCall className="w-3.5 h-3.5" />}
          value={entities.customer_care?.raw}
          found={entities.customer_care?.found ?? false}
          confidence={entities.customer_care?.found ? 0.93 : 0}
          required
          ruleCitation="Rule 6(1)(f)"
        />

        <EntityCard
          label="Country of Origin"
          icon={<Globe className="w-3.5 h-3.5" />}
          value={entities.country_of_origin?.value}
          found={entities.country_of_origin?.found ?? false}
          confidence={entities.country_of_origin?.found ? 0.96 : 0}
          required
          ruleCitation="Rule 6(1)(g)"
        />
      </div>
    </div>
  );
};
