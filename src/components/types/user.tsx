export interface AthleteEvent {
    name: string;
    time: string;
  }
  
  export interface AthleticProfile {
    sport: string;
    events: AthleteEvent[];
  }
  
  export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    athleticProfile: AthleticProfile;
  }
  
  