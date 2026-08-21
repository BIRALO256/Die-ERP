import { useState } from 'react'
import { X, Layers, Check, FileCode2, Sparkles, Plus } from 'lucide-react'
import { useSchemaStore } from '../stores/schema-store'
import type { FormSchema } from '../types'

interface FormSchemaModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectSchemaForOnboarding?: (version: string) => void
}

export function FormSchemaModal({
  isOpen,
  onClose,
  onSelectSchemaForOnboarding,
}: FormSchemaModalProps) {
  const { schemas } = useSchemaStore()
  const [activeVersion, setActiveVersion] = useState<string>('v1.0')
  const activeSchema: FormSchema =
    schemas.find((s) => s.version === activeVersion) || schemas[0]

  if (!isOpen) return null

  const totalFields = activeSchema.sections.reduce((sum, s) => sum + s.fields.length, 0)

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Bio-Data Form Schema Engine</h3>
              <p className="text-[11px] text-slate-400">Dynamic, versioned intake schemas & custom field definitions</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Version Switcher Strip */}
        <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Available Revisions:</span>
            {schemas.map((s) => {
              const isActive = s.version === activeVersion
              return (
                <button
                  key={s.version}
                  type="button"
                  onClick={() => setActiveVersion(s.version)}
                  className={[
                    'flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer',
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100',
                  ].join(' ')}
                >
                  <FileCode2 className="h-3 w-3" />
                  {s.version} {s.version === 'v1.0' ? '(Baseline)' : s.version === 'v2.0' ? '(Extended)' : s.title || ''}
                </button>
              )
            })}
          </div>

          <span className="text-[11px] font-mono text-slate-400">
            {totalFields} Fields across {activeSchema.sections.length} Sections
          </span>
        </div>

        {/* Schema Description & Sections List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Schema {activeSchema.version}</span>
              <span className="text-[10px] text-slate-400 font-mono">Adopted {activeSchema.effectiveDate}</span>
            </div>
            <p className="text-slate-600 text-[11px]">{activeSchema.description}</p>
          </div>

          {/* Sections Breakdown */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 text-xs">Defined Sections & Fields</h4>
            {activeSchema.sections.map((section, idx) => (
              <div key={section.id} className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-3.5 py-2 border-b border-slate-200/80 flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">
                    {idx + 1}. {section.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {section.fields.length} field{section.fields.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="p-3 grid grid-cols-2 gap-2 text-[11px]">
                  {section.fields.map((f) => (
                    <div key={f.id} className="flex items-center justify-between bg-white border border-slate-100 p-2 rounded-lg">
                      <span className="font-medium text-slate-700">{f.label}</span>
                      <span className="font-mono text-[9px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                        {f.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 flex items-center justify-between bg-white shrink-0">
          <p className="text-[11px] text-slate-400">
            Form schemas allow evolving HR data capture without altering legacy database columns.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
