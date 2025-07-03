import {User} from "../../users/entities/user.entity";

export interface LoginResultDto {
    accessToken: string;
    refreshToken: string;
    user: User;
}