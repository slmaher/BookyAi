"use client";

import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import LoadingOverlay from "@/components/LoadingOverlay";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { DEFAULT_VOICE, voiceCategories, voiceOptions } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { UploadSchema, type UploadSchemaType } from "@/lib/zod";

const UploadIcon = () => (
	<svg
		className="upload-dropzone-icon"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<path d="M12 16V4" />
		<path d="m7.5 8.5 4.5-4.5 4.5 4.5" />
		<path d="M4 15.5V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2.5" />
	</svg>
);

const ImageIcon = () => (
	<svg
		className="upload-dropzone-icon"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.8"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<rect x="3" y="4" width="18" height="16" rx="2" />
		<circle cx="9" cy="10" r="1.75" />
		<path d="m21 16-4.8-4.8a1 1 0 0 0-1.4 0L7 19" />
	</svg>
);

const UploadForm = () => {
	const pdfInputRef = useRef<HTMLInputElement>(null);
	const coverInputRef = useRef<HTMLInputElement>(null);

	const form = useForm<UploadSchemaType>({
		resolver: zodResolver(UploadSchema),
		defaultValues: {
			pdfFile: undefined,
			coverImage: undefined,
			title: "",
			author: "",
			voice: DEFAULT_VOICE,
		},
	});

	const onSubmit = async (values: UploadSchemaType) => {
		await new Promise((resolve) => setTimeout(resolve, 1200));
		console.log("Book upload payload", values);
	};

	return (
		<>
			<div className="new-book-wrapper">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="pdfFile"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Book PDF File</FormLabel>
									<FormControl>
										<label
											className={cn(
												"upload-dropzone border-2 border-dashed border-[#d3c7b6]",
												field.value && "upload-dropzone-uploaded"
											)}
										>
											<input
												ref={pdfInputRef}
												type="file"
												accept="application/pdf"
												className="hidden"
												onChange={(event) => {
													const selectedFile = event.target.files?.[0];
													field.onChange(selectedFile ?? undefined);
												}}
											/>

											{!field.value ? (
												<>
													<UploadIcon />
													<p className="upload-dropzone-text">Click to upload PDF</p>
													<p className="upload-dropzone-hint">PDF file (max 50MB)</p>
												</>
											) : (
												<div className="flex items-center gap-3">
													<p className="upload-dropzone-text">{field.value.name}</p>
													<button
														type="button"
														className="upload-dropzone-remove"
														onClick={(event) => {
															event.preventDefault();
															event.stopPropagation();
															field.onChange(undefined);
															if (pdfInputRef.current) {
																pdfInputRef.current.value = "";
															}
														}}
														aria-label="Remove PDF file"
													>
														<svg
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															strokeWidth="2"
															className="h-4 w-4"
															aria-hidden="true"
														>
															<path d="M18 6 6 18" />
															<path d="m6 6 12 12" />
														</svg>
													</button>
												</div>
											)}
										</label>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="coverImage"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Cover Image (Optional)</FormLabel>
									<FormControl>
										<label
											className={cn(
												"upload-dropzone border-2 border-dashed border-[#d3c7b6]",
												field.value && "upload-dropzone-uploaded"
											)}
										>
											<input
												ref={coverInputRef}
												type="file"
												accept="image/jpeg,image/jpg,image/png,image/webp"
												className="hidden"
												onChange={(event) => {
													const selectedFile = event.target.files?.[0];
													field.onChange(selectedFile ?? undefined);
												}}
											/>

											{!field.value ? (
												<>
													<ImageIcon />
													<p className="upload-dropzone-text">Click to upload cover image</p>
													<p className="upload-dropzone-hint">
														Leave empty to auto-generate from PDF
													</p>
												</>
											) : (
												<div className="flex items-center gap-3">
													<p className="upload-dropzone-text">{field.value.name}</p>
													<button
														type="button"
														className="upload-dropzone-remove"
														onClick={(event) => {
															event.preventDefault();
															event.stopPropagation();
															field.onChange(undefined);
															if (coverInputRef.current) {
																coverInputRef.current.value = "";
															}
														}}
														aria-label="Remove cover image"
													>
														<svg
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															strokeWidth="2"
															className="h-4 w-4"
															aria-hidden="true"
														>
															<path d="M18 6 6 18" />
															<path d="m6 6 12 12" />
														</svg>
													</button>
												</div>
											)}
										</label>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<input
											{...field}
											className="form-input"
											placeholder="ex: Rich Dad Poor Dad"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="author"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Author Name</FormLabel>
									<FormControl>
										<input
											{...field}
											className="form-input"
											placeholder="ex: Robert Kiyosaki"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="voice"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Choose Assistant Voice</FormLabel>
									<FormControl>
										<div className="space-y-5">
											<div className="space-y-3">
												<p className="text-(--text-secondary) text-base">Male Voices</p>
												<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
													{voiceCategories.male.map((voiceKey) => {
														const voice = voiceOptions[voiceKey as keyof typeof voiceOptions];
														const isSelected = field.value === voiceKey;

														return (
															<button
																key={voiceKey}
																type="button"
																className={cn(
																	"voice-selector-option text-left justify-start",
																	isSelected
																		? "voice-selector-option-selected"
																		: "voice-selector-option-default"
																)}
																onClick={() => field.onChange(voiceKey)}
															>
																<span
																	className={cn(
																		"h-4 w-4 rounded-full border border-[#b8aa93]",
																		isSelected && "border-[6px] border-[#663820]"
																	)}
																/>
																<div>
																	<p className="font-semibold text-(--text-primary)">{voice.name}</p>
																	<p className="text-sm text-(--text-secondary)">
																		{voice.description}
																	</p>
																</div>
															</button>
														);
													})}
												</div>
											</div>

											<div className="space-y-3">
												<p className="text-(--text-secondary) text-base">Female Voices</p>
												<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
													{voiceCategories.female.map((voiceKey) => {
														const voice = voiceOptions[voiceKey as keyof typeof voiceOptions];
														const isSelected = field.value === voiceKey;

														return (
															<button
																key={voiceKey}
																type="button"
																className={cn(
																	"voice-selector-option text-left justify-start",
																	isSelected
																		? "voice-selector-option-selected"
																		: "voice-selector-option-default"
																)}
																onClick={() => field.onChange(voiceKey)}
															>
																<span
																	className={cn(
																		"h-4 w-4 rounded-full border border-[#b8aa93]",
																		isSelected && "border-[6px] border-[#663820]"
																	)}
																/>
																<div>
																	<p className="font-semibold text-(--text-primary)">{voice.name}</p>
																	<p className="text-sm text-(--text-secondary)">
																		{voice.description}
																	</p>
																</div>
															</button>
														);
													})}
												</div>
											</div>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="form-btn" disabled={form.formState.isSubmitting}>
							Begin Synthesis
						</Button>
					</form>
				</Form>
			</div>

			{form.formState.isSubmitting ? <LoadingOverlay /> : null}
		</>
	);
};

export default UploadForm;
