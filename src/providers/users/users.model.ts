export interface UserObject {
    ID: string;
    NomeCompleto: string;
    SocialID: string;
    SocialType: string;
    Email: string;
    Telefono?: any;
    Ruolo?: any;
    Voto: string;
    MioVoto?: any;
    Picture: string;
    Groups?: any;
    MatchesALL?: any;
    Matches?: any;
    CurrentGroup: string;
    Type: string;
    matches_played: string;
    matches_win: string;
    matches_lost: string;
    debug: string;
    device_id: string;
    description: string;
}