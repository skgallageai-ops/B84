
import { DropdownData } from './types';

export const DEFAULT_DROPDOWN_DATA: DropdownData = {
  activities: [
    { boqItem: '1.1', activityCode: '01-55-26-00', description: 'Traffic safety and control' },
    { boqItem: '1.2', activityCode: '01-71-13-00', description: 'Allow for mobilization and demobilization.' },
    { boqItem: '1.3', activityCode: '01-71-23-16-1', description: 'Cross - sectional detailing of full width as Specified' },
    { boqItem: '1.4', activityCode: '01-71-23-19', description: 'Setting-out work other than cross-sectional detailing' },
    { boqItem: '1.5', activityCode: '01-71-23-16', description: 'Property condition survey' },
    { boqItem: '1.6', activityCode: '01-58-13-00', description: 'Provide and maintain Project sign boards' },
    { boqItem: '1.7', activityCode: '00-62-16-00', description: 'Allow all necessary Insurances' },
    { boqItem: '1.8', activityCode: '01-52-25-20', description: 'Provide and Maintain vehicle for Engineer.' },
    { boqItem: '1.9', activityCode: '01-32-10-00', description: 'Allow for stationery & other stores as directed by the Engineer' },
    { boqItem: '1.10', activityCode: '33-00-00-00', description: 'Shifting of utility services' },
    { boqItem: '2.1', activityCode: '31-11-00-00', description: 'Clearing and Grubbing' },
    { boqItem: '3.1', activityCode: '31-23-16-46', description: 'Roadway excavation, hard rock - chemical blasting' },
    { boqItem: '3.2', activityCode: '31-23-16-31', description: 'Roadway excavation, unsuitable soil' },
    { boqItem: '3.3', activityCode: '31-24-13-60', description: 'Trimming, levelling & compaction of original ground.' },
    { boqItem: '3.4', activityCode: '31-23-16-11', description: 'Channel excavation, unsuitable soil' },
    { boqItem: '3.5', activityCode: '31-23-16-19', description: 'Excavation for structures, unsuitable soil' },
    { boqItem: '4.1', activityCode: '32-11-16-00', description: 'Provide sub base type 1 compacted in position' },
    { boqItem: '4.2', activityCode: '32-11-23-00', description: 'Dense graded aggregate base (37.5mm)' },
    { boqItem: '4.3', activityCode: '32-11-23-00', description: 'Dense graded aggregate base (37.5mm) - Item 4.3' },
    { boqItem: '4.4', activityCode: '32-01-11-55', description: 'Scarifying existing surface' },
    { boqItem: '4.5', activityCode: '32-11-16-20', description: 'Earthen shoulders as compacted in position.' },
    { boqItem: '5.1', activityCode: '32-12-13-19', description: 'Prime coat using bitumen emulsion CSS-1 at the rate of 1.0 Ltr/Sq.m blinding with sand at the rate of 250 Sq.m/Cu.m' },
    { boqItem: '5.2', activityCode: '32-12-13-13', description: 'Tack coat using emulsion CRS-1 at the rate of 0.5 ltr/Sq.m inclusive of brushing cleaning road surface including transport of emulsion.' },
    { boqItem: '5.3', activityCode: '32-12-16-00', description: 'Supplying, laying & compacting Asphalt concrete in binder course' },
    { boqItem: '5.4', activityCode: '32-12-19-00', description: 'Supplying laying & compacting of asphalt wearing course (50 mm uniform thick)' },
    { boqItem: '6.1', activityCode: '03-31-05-18', description: 'Concrete Class C, Screed concrete, Grade 15' },
    { boqItem: '6.2', activityCode: '03-31-05-25', description: 'Concrete Class B, Grade 25(19mm)' },
    { boqItem: '6.3', activityCode: '03-20-00-00', description: 'Tor steel reinforcement (including wall raising)' },
    { boqItem: '6.4', activityCode: '03-11-00-00', description: 'Formwork smooth finish' },
    { boqItem: '6.5', activityCode: '03-11-00-00', description: 'Formwork rough finish for Drains' },
    { boqItem: '6.6', activityCode: '33-46-33-11', description: 'Weep hole, PVC pipe (Type 600) - 75mm diameter' },
    { boqItem: '6.7', activityCode: '31-23-23-27', description: 'Aggregate backfills' },
    { boqItem: '6.8', activityCode: '46-61-13-00', description: 'Filter medium' },
    { boqItem: '6.9', activityCode: '33-46-33-27', description: 'Impervious layer' },
    { boqItem: '6.10', activityCode: '04-43-11-00', description: 'Random rubble masonry' },
    { boqItem: '6.11', activityCode: '09-24-53-00', description: 'Plastering smooth finish' },
    { boqItem: '6.12', activityCode: '32-16-13-20', description: 'Provision for painting two coats of enamel paint on kerbs and two coats of anti-corrosive paint on GI pipe' },
    { boqItem: '6.13', activityCode: '03-41-16-19', description: 'Precast reinforced concrete cover slabs (900x450x150mm, class B, Grade 25) - Heavy duty' },
    { boqItem: '6.14', activityCode: '03-41-16-19', description: 'Precast reinforced concrete cover slabs (900x450x150mm, class B, Grade 25) - Light duty' },
    { boqItem: '7.1', activityCode: '32-14-13-13', description: 'Supplying and laying uni-paving red coloured interlocking blocks (25N/Sq.m) over 50mm thick compacted crusher fines bed' },
    { boqItem: '7.2', activityCode: '32-16-13-24', description: 'Standard Kerb' },
    { boqItem: '7.3', activityCode: '32-16-13-24', description: 'Bridge Kerb' },
    { boqItem: '7.4', activityCode: '03-31-05-18', description: 'Concrete Class C, Grade 15 (19mm) as screed' },
    { boqItem: '7.5', activityCode: '32-11-23-00', description: 'Dense graded aggregate base (37.5mm)' },
    { boqItem: '7.6', activityCode: '09-32-33-00', description: 'Provision for motor bed for kerb laying and interlocking block paving' },
    { boqItem: '7.7', activityCode: '32-17-23-00', description: 'Road Marking-Using thermoplastic paint-centre line: Intermittent, edge lines' },
    { boqItem: '7.8', activityCode: '32-17-23-00', description: 'Road Marking-Using thermoplastic paint-pedestrian crossing' },
    { boqItem: '7.9', activityCode: '32-17-23-00', description: 'Road Marking-Using thermoplastic paint-Bus bay line' },
    { boqItem: '7.10', activityCode: '10-14-53-00', description: 'Single pole, sign area upto 0.5 m2' },
    { boqItem: '7.11', activityCode: '32-16-13-46', description: 'Kerb inlet' },
    { boqItem: '7.12', activityCode: '32-39-13-00', description: 'Bollards - Flexible' },
    { boqItem: '7.13', activityCode: '09-69-00-00', description: 'Allow for the construction of house access' },
    { boqItem: '7.14', activityCode: '05-55-19-00', description: 'Provision for hand rail welding and repairing' },
    { boqItem: '8.10', activityCode: '00-00-20-10', description: 'Day work : Labour' },
    { boqItem: '8.20', activityCode: '00-00-20-20', description: 'Day work : Contractor\'s Equipment' },
    { boqItem: '8.30', activityCode: '00-00-20-30', description: 'Day work : Materials' },
    { boqItem: 'Site O/H', activityCode: '00-00-11-30', description: 'Overhead Salaries' },
    { boqItem: 'Site O/H', activityCode: '00-00-11-77', description: 'Vehicle Cost' },
    { boqItem: 'Site O/H', activityCode: '00-00-11-13', description: 'Welfare + Meal Cost' },
    { boqItem: 'Site O/H', activityCode: '01-71-13-00', description: 'Machine Mobilization & Demobilization cost' }
  ],
  machineryTypes: [
    '1 Cube Tipper', '3 Cube Tipper', 'Air Compressor', 'Poker Vibrator', 'Bob Cat', 'Backhoe loader', 'Bitumen Distributor', 'Bitumen - Hand Sprayor', 'Mechanical paver', 'PTR', 'Vibrating roller - 8 Ton (Asphalt)', 'Motor Grader', 'Tractor & trailer', 'Water bowser', 'V/Rammer ( 60 Kg )', 'Vibrating roller - 5 Ton', 'Vibrating roller - 10 Ton', 'Bar bending machine', 'Bar Cutter', 'Boom Truck', 'Concrete Mixer', 'Truck Mixture (2.5)'
  ],
  manpowerRoles: [
    'Site Engineer', 'Technical Officer', 'Foreman', 'Supervisor', 'Surveyor', 'Survey Assistant', 'Machine Operator', 'Driver', 'Skilled Labour', 'Semi-Skilled Labour', 'Unskilled Labour', 'Flagman', 'Security Officer'
  ],
  materials: [
    'Asphalt Wearing Course', 'Asphalt Binder Course', 'Sub-Base Material', 'Shoulder Material', 'ABC Material', 'Rubble ( 150-225mm)', '19mm Aggregate', 'Cement', 'Sand', 'Quarry Dust', 'CSS 1', 'CRS 1', 'T10 Steel', 'Y12 Steel', 'Y16 Steel', 'Y20 Steel', 'Mild Steel', 'Binding wire', '75mm dia PVC pipe', 'Traffic Sign - 0.5m2', 'Kerb - Standard', 'Paving blocks (225x110x80mm)', 'Bollards - Flexible', 'Plywood 15mm Thick', 'Timber (2x4)', 'Timber (2x2)', 'Fixing Bolts (10 uses)', 'Wire Nails', 'Mold oil', 'Thomo plastic material', 'Glass baeds', 'Asphalt cutting Wheel', 'Coconut oil', 'Concrete G-15', 'Concrete G-25'
  ],
  units: [
    'Nr', 'Cu.m', 'Sq.m', 'm', 'MT', 'Kg', 'Ltr', '50 KG', 'Hr', 'Day', 'L.S.', 'Km', 'PS', 'Nos', 'Month', 'lm', 'L.m', 'Bar'
  ]
};
