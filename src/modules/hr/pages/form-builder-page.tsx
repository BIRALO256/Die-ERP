import { useState } from 'react'
import {
  Layers, Plus, Trash2, Edit3, Eye, Check, Save, Copy
} from 'lucide-react'
import { Button } from '../../../shared/components/ui/button'
import { useSchemaStore } from '../stores/schema-store'
import type { FormSchema, FormSection, FormField, FormFieldType } from '../types'

export default function FormBuilderPage() {
  const { schemas, activeSchemaVersion, addSchema } = useSchemaStore()

  // Selected schema to edit or preview
  const [selectedVersion, setSelectedVersion] = useState<string>(activeSchemaVersion || 'v1.0')
  const baseSchema = schemas.find((s) => s.version === selectedVersion) || schemas[0]

  // Working copy in editor
  const [editingSchema, setEditingSchema] = useState<FormSchema>(JSON.parse(JSON.stringify(baseSchema)))
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')
  const [newVersionInput, setNewVersionInput] = useState<string>('v3.0')
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Switch base schema
  const handleSelectSchema = (ver: string) => {
    setSelectedVersion(ver)
    const target = schemas.find((s) => s.version === ver) || schemas[0]
    setEditingSchema(JSON.parse(JSON.stringify(target)))
    setSaveSuccess(false)
  }

  // Add new section
  const handleAddSection = () => {
    const newSec: FormSection = {
      id: `custom_sec_${Date.now()}`,
      title: 'New Medical / Lab Clearance Section',
      subtitle: 'Facility specific intake criteria and certifications',
      iconName: 'ShieldCheck',
      fields: [
        {
          id: `custom_field_${Date.now()}`,
          label: 'Custom Clearance Code',
          type: 'text',
          placeholder: 'e.g. ISO-14644-Grade',
          required: true,
          colSpan: 1,
        },
      ],
    }
    setEditingSchema({
      ...editingSchema,
      sections: [...editingSchema.sections, newSec],
    })
  }

  // Remove section
  const handleRemoveSection = (sectionIndex: number) => {
    setEditingSchema({
      ...editingSchema,
      sections: editingSchema.sections.filter((_, idx) => idx !== sectionIndex),
    })
  }

  // Add field to section
  const handleAddField = (sectionIndex: number) => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      label: 'New Dynamic Field',
      type: 'text',
      placeholder: 'Enter details...',
      required: false,
      colSpan: 1,
    }
    const updatedSections = [...editingSchema.sections]
    updatedSections[sectionIndex].fields.push(newField)
    setEditingSchema({ ...editingSchema, sections: updatedSections })
  }

  // Update field property
  const handleUpdateField = (sectionIndex: number, fieldIndex: number, updates: Partial<FormField>) => {
    const updatedSections = [...editingSchema.sections]
    updatedSections[sectionIndex].fields[fieldIndex] = {
      ...updatedSections[sectionIndex].fields[fieldIndex],
      ...updates,
    }
    setEditingSchema({ ...editingSchema, sections: updatedSections })
  }

  // Remove field
  const handleRemoveField = (sectionIndex: number, fieldIndex: number) => {
    const updatedSections = [...editingSchema.sections]
    updatedSections[sectionIndex].fields = updatedSections[sectionIndex].fields.filter(
      (_, idx) => idx !== fieldIndex
    )
    setEditingSchema({ ...editingSchema, sections: updatedSections })
  }

  // Save / Publish Schema
  const handlePublishSchema = (asNewVersion = false) => {
    const versionToSave = asNewVersion ? newVersionInput.trim() : editingSchema.version
    const schemaToSave: FormSchema = {
      ...editingSchema,
      version: versionToSave,
      effectiveDate: new Date().toISOString().split('T')[0],
    }

    addSchema(schemaToSave)
    setSelectedVersion(versionToSave)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-border">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-lg font-bold text-foreground tracking-tight" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            HR Form Schema Builder
          </h1>
          <span className="text-slate-300">·</span>
          <span className="text-xs text-slate-500 font-medium">Dynamic Intake Engine</span>
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
            Schemaless JSONB Storage
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={[
                'px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer',
                activeTab === 'editor' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-700',
              ].join(' ')}
            >
              <Edit3 className="h-3.5 w-3.5 inline mr-1" />
              Schema Editor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={[
                'px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer',
                activeTab === 'preview' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-700',
              ].join(' ')}
            >
              <Eye className="h-3.5 w-3.5 inline mr-1" />
              Live Form Preview
            </button>
          </div>

          <Button
            onClick={() => handlePublishSchema(false)}
            size="sm"
            className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-3.5 py-1.5 h-auto shadow-2xs cursor-pointer"
          >
            <Save className="h-3.5 w-3.5 mr-1" />
            Save Changes ({editingSchema.version})
          </Button>
        </div>
      </div>

      {/* Success banner */}
      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-2.5 rounded-xl flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-600" />
            <span className="font-semibold">
              Schema {editingSchema.version} successfully published! It is now active and ready in the Onboard Personnel modal.
            </span>
          </div>
        </div>
      )}

      {/* Schema Version Selector & Branching Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-slate-400" /> Current Revisions:
          </span>
          {schemas.map((s) => (
            <button
              key={s.version}
              type="button"
              onClick={() => handleSelectSchema(s.version)}
              className={[
                'px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer',
                selectedVersion === s.version
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
              ].join(' ')}
            >
              {s.version} {s.version === 'v1.0' ? '(Baseline)' : s.version === 'v2.0' ? '(Extended)' : ''}
            </button>
          ))}
        </div>

        {/* Clone / Branch as New Version */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newVersionInput}
            onChange={(e) => setNewVersionInput(e.target.value)}
            placeholder="e.g. v3.0"
            className="w-20 px-2.5 py-1 text-xs font-mono font-bold rounded-lg border border-slate-200 bg-slate-50 focus:bg-white text-center"
          />
          <button
            type="button"
            onClick={() => handlePublishSchema(true)}
            className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <Copy className="h-3 w-3" />
            Publish as New Version
          </button>
        </div>
      </div>

      {/* Main Builder Body */}
      {activeTab === 'editor' ? (
        <div className="space-y-4">
          {/* Schema Metadata Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Schema Information ({editingSchema.version})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Version Description</label>
                <input
                  type="text"
                  value={editingSchema.description || ''}
                  onChange={(e) => setEditingSchema({ ...editingSchema, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Effective Date</label>
                <input
                  type="date"
                  value={editingSchema.effectiveDate}
                  onChange={(e) => setEditingSchema({ ...editingSchema, effectiveDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Sections List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Form Sections & Dynamic Fields ({editingSchema.sections.length} Sections)
              </h3>
              <button
                type="button"
                onClick={handleAddSection}
                className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                Add New Section
              </button>
            </div>

            {editingSchema.sections.map((section, secIdx) => (
              <div key={section.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
                {/* Section Header */}
                <div className="bg-slate-50/80 px-5 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="w-5 h-5 rounded-md bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
                      {secIdx + 1}
                    </span>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => {
                        const next = [...editingSchema.sections]
                        next[secIdx].title = e.target.value
                        setEditingSchema({ ...editingSchema, sections: next })
                      }}
                      className="text-xs font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-primary focus:outline-none px-1 py-0.5"
                    />
                    <input
                      type="text"
                      value={section.subtitle || ''}
                      placeholder="Section description / subtitle"
                      onChange={(e) => {
                        const next = [...editingSchema.sections]
                        next[secIdx].subtitle = e.target.value
                        setEditingSchema({ ...editingSchema, sections: next })
                      }}
                      className="text-[11px] text-slate-400 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-primary focus:outline-none px-1 py-0.5 flex-1 max-w-sm hidden sm:block"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddField(secIdx)}
                      className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <Plus className="h-3 w-3 text-primary" />
                      Add Field
                    </button>
                    {editingSchema.sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSection(secIdx)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Remove section"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Fields inside Section */}
                <div className="p-4 space-y-2.5">
                  {section.fields.map((field, fIdx) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-12 gap-2 items-center bg-slate-50/60 border border-slate-200/80 rounded-xl p-3 text-xs"
                    >
                      {/* Field Label */}
                      <div className="col-span-4">
                        <label className="text-[10px] text-slate-400 block font-semibold mb-0.5">Field Label</label>
                        <input
                          type="text"
                          value={field.label}
                          onChange={(e) => handleUpdateField(secIdx, fIdx, { label: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white font-medium focus:outline-none focus:border-primary"
                        />
                      </div>

                      {/* Field Type */}
                      <div className="col-span-3">
                        <label className="text-[10px] text-slate-400 block font-semibold mb-0.5">Input Type</label>
                        <select
                          value={field.type}
                          onChange={(e) =>
                            handleUpdateField(secIdx, fIdx, { type: e.target.value as FormFieldType })
                          }
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-primary font-mono"
                        >
                          <option value="text">Text (String)</option>
                          <option value="number">Number (Numeric)</option>
                          <option value="date">Date (ISO)</option>
                          <option value="select">Dropdown (Select)</option>
                          <option value="phone">Phone (+256)</option>
                          <option value="email">Email</option>
                          <option value="textarea">Textarea (Long)</option>
                          <option value="dependent_list">Dependent List (Sub-table)</option>
                          <option value="emergency_contact">Emergency Contact Block</option>
                        </select>
                      </div>

                      {/* Facility Scope */}
                      <div className="col-span-2">
                        <label className="text-[10px] text-slate-400 block font-semibold mb-0.5">Scope</label>
                        <select
                          value={
                            field.facilityTypes && field.facilityTypes.length > 0
                              ? field.facilityTypes[0]
                              : 'ALL'
                          }
                          onChange={(e) => {
                            const val = e.target.value
                            handleUpdateField(secIdx, fIdx, {
                              facilityTypes: val === 'ALL' ? undefined : [val],
                            })
                          }}
                          className="w-full px-2 py-1.5 text-[11px] rounded-lg border border-slate-200 bg-white focus:outline-none"
                        >
                          <option value="ALL">All Facilities</option>
                          <option value="MANUFACTURING">GMP Plant Only</option>
                          <option value="CLINICAL">Clinical Only</option>
                          <option value="AGRICULTURE">Agro Only</option>
                        </select>
                      </div>

                      {/* Required Toggle */}
                      <div className="col-span-2 flex items-center gap-1.5 pt-4">
                        <input
                          type="checkbox"
                          id={`req_${field.id}`}
                          checked={Boolean(field.required)}
                          onChange={(e) => handleUpdateField(secIdx, fIdx, { required: e.target.checked })}
                          className="rounded border-slate-300 text-primary focus:ring-primary h-3.5 w-3.5"
                        />
                        <label htmlFor={`req_${field.id}`} className="text-[11px] font-semibold text-slate-700 cursor-pointer">
                          Required
                        </label>
                      </div>

                      {/* Delete */}
                      <div className="col-span-1 flex justify-end pt-4">
                        <button
                          type="button"
                          onClick={() => handleRemoveField(secIdx, fIdx)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* LIVE FORM PREVIEW */
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Live Preview: Employee Bio-Data Form ({editingSchema.version})
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">{editingSchema.description}</p>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Interactive Mock Mode
            </span>
          </div>

          <div className="space-y-6">
            {editingSchema.sections.map((sec, idx) => (
              <div key={sec.id} className="space-y-3">
                <div className="border-b border-slate-100 pb-1.5">
                  <h4 className="text-xs font-bold text-slate-900">
                    {idx + 1}. {sec.title}
                  </h4>
                  {sec.subtitle && <p className="text-[11px] text-slate-400">{sec.subtitle}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  {sec.fields.map((f) => (
                    <div key={f.id} className={f.colSpan === 2 ? 'col-span-2' : 'col-span-1'}>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {f.label} {f.required && <span className="text-rose-500">*</span>}
                      </label>
                      <input
                        type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
                        placeholder={f.placeholder || 'Enter value...'}
                        disabled
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-600"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
