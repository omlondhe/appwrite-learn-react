import conf from "../conf/conf";
import { Databases, ID, Client, Storage, Query } from "appwrite";

class AppWriteDatabaseService {
	client = new Client();
	databases;
	storage;

	constructor() {
		this.client
			.setEndpoint(conf.APPWRITE_URL)
			.setProject(conf.APPWRITE_PROJECT_ID);
		this.databases = new Databases(this.client);
		this.storage = new Storage(this.client);
	}

	async createPost({ userId, title, slug, content, featuredImage, status }) {
		try {
			return await this.databases.createDocument(
				conf.APPWRITE_BLOG_DATABASE_ID,
				conf.APPWRITE_ARTICLE_COLLECTION_ID,
				slug,
				{
					title,
					content,
					userId,
					status,
					featuredImage,
				}
			);
		} catch (error) {
			throw error;
		}
	}

	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			return await this.databases.updateDocument(
				conf.APPWRITE_BLOG_DATABASE_ID,
				conf.APPWRITE_ARTICLE_COLLECTION_ID,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
				}
			);
		} catch (error) {
			throw error;
		}
	}

	async deletePost(slug) {
		try {
			await this.databases.deleteDocument(
				conf.APPWRITE_BLOG_DATABASE_ID,
				conf.APPWRITE_ARTICLE_COLLECTION_ID,
				slug
			);
			return true;
		} catch (error) {
			throw error;
		}
	}

	async getPost(slug) {
		try {
			return await this.databases.getDocument(
				conf.APPWRITE_BLOG_DATABASE_ID,
				conf.APPWRITE_ARTICLE_COLLECTION_ID,
				slug
			);
		} catch (error) {
			throw error;
		}
	}

	async getAllPosts(queries = [Query.equal("status", "active")]) {
		try {
			return await this.databases.listDocuments(
				conf.APPWRITE_BLOG_DATABASE_ID,
				conf.APPWRITE_ARTICLE_COLLECTION_ID,
				queries
			);
		} catch (error) {
			throw error;
		}
	}

	async uploadFile(file) {
		try {
			return await this.storage.createFile(
				conf.APPWRITE_BUCKET_ID,
				ID.unique(),
				file
			);
		} catch (error) {
			throw error;
		}
	}

	async deleteFile(fileId) {
		try {
			await this.storage.deleteFile(conf.APPWRITE_BUCKET_ID, fileId);
			return true;
		} catch (error) {
			throw error;
		}
	}

	getFilePreview(fileId) {
		return this.storage.getFilePreview(conf.APPWRITE_BUCKET_ID, fileId);
	}
}

const appWriteDatabaseService = new AppWriteDatabaseService();
export { appWriteDatabaseService };
