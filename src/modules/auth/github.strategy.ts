//auth.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';
import { UserRepository } from 'src/database/repositories/user.repository';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly userRepository: UserRepository) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['public_profile', 'user'],
    });
  }

  async validate(accessToken: string, _refreshToken: string, profile: Profile) {
    const email = profile.emails?.find((email) => email.type == 'primary')?.value || profile.emails?.[0]?.value;

    const userRegister = await this.userRepository.findOne({
      email ,
    });


    if (!userRegister) {
      await this.userRepository.create({
        name: `${profile.displayName}`,
        email,
        git_user_id: profile.id,
        password: accessToken,
      });
    }

    if (userRegister && !userRegister.git_user_id) {
      await this.userRepository.update(
        {
          id: userRegister.id,
        },
        {
          git_user_id: profile.id,
        },
      );
    }

    return profile;
  }
}
