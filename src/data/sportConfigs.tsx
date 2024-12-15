import baseball from './sports/baseball';
import basketball from './sports/basketball';
import bowling from './sports/bowling';
import diving from './sports/diving';
import fencing from './sports/fencing';
import football from './sports/football';
import golf from './sports/golf';
import gymnastics from './sports/gymnastics';
import iceHockey from './sports/iceHockey';
import lacrosse from './sports/lacrosse';
import skiing from './sports/skiing';
import soccer from './sports/soccer';
import swimming from './sports/swimming';
import tennis from './sports/tennis';
import triathlon from './sports/triathlon';
import volleyball from './sports/volleyball';
import waterPolo from './sports/waterPolo';

export interface SportParameter {
  name: string;
  type: "checkbox" | "text";
  options?: string[];
  placeholder?: string;
  label?: string;
  conditionalFields?: { [key: string]: SportParameter[] };
}

export interface SportConfig {
  name: string;
  fields: SportParameter[];
}


const sportConfigs: Record<string, SportConfig> = {
  baseball,
  basketball,
  bowling,
  diving,
  fencing,
  football,
  golf,
  gymnastics,
  "ice hockey": iceHockey,
  lacrosse,
  skiing,
  soccer,
  swimming,
  tennis,
  triathlon,
  volleyball,
  "water polo": waterPolo,
};

export default sportConfigs;
