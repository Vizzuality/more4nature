import {
  ComplianceType,
  ThematicArea,
  Impact,
  Location,
  CaseStudyFilters,
} from '@/lib/case-studies.service';

export const FILTERS: {
  name: string;
  key: keyof CaseStudyFilters;
  options: (
    | { label: ThematicArea; value: ThematicArea }
    | { label: ComplianceType; value: ComplianceType }
    | { label: Impact; value: Impact }
    | { label: Location; value: Location }
  )[];
}[] = [
  {
    name: 'By thematic area',
    key: 'thematicAreas',
    options: Object.values(ThematicArea).map((area) => ({ label: area, value: area })),
  },
  {
    name: 'By compliance type',
    key: 'complianceTypes',
    options: Object.values(ComplianceType).map((type) => ({ label: type, value: type })),
  },
  {
    name: 'By impact',
    key: 'impacts',
    options: Object.values(Impact).map((impact) => ({ label: impact, value: impact })),
  },
  {
    name: 'By location',
    key: 'locations',
    options: Object.values(Location).map((location) => ({ label: location, value: location })),
  },
];