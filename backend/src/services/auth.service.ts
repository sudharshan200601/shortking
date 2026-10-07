import { userRepository } from "../repositories/user.repository.js";
import { NotFoundError } from "../utils/errors.js";
import type { UserProfile } from "@shortking/shared";

export class AuthService {
  async getProfile(userId: string): Promise<UserProfile> {
    const profile = await userRepository.getProfile(userId);
    if (!profile) {
      throw new NotFoundError("User profile not found");
    }
    return profile;
  }

  async updateProfile(
    userId: string,
    updates: { name?: string | null; avatarUrl?: string | null },
  ): Promise<UserProfile> {
    const updated = await userRepository.updateProfile(userId, updates);
    if (!updated) {
      throw new NotFoundError("User profile not found");
    }
    return updated;
  }
}

export const authService = new AuthService();
