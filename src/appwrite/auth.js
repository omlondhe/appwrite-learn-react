import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

class AppWriteAuthService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(conf.APPWRITE_URL)
			.setProject(conf.APPWRITE_PROJECT_ID);
		this.account = new Account();
	}

	async createAccount({ email, password, name }) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);

			if (userAccount) return this.login({ email, password });
			return null;
		} catch (error) {
			throw error;
		}
	}

	async login({ email, password }) {
		try {
			return await this.account.createEmailSession(email, password);
		} catch (error) {
			throw error;
		}
	}

	async logout() {
		try {
			await this.account.deleteSessions();
		} catch (error) {
			throw error;
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			console.log("Error occurred while getting current user: ", error);
			return null;
		}
	}
}

const appWriteAuthService = new AppWriteAuthService();
export { appWriteAuthService };
