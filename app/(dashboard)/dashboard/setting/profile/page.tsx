"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/src/context";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8080";

interface ProfileData {
  name: string;
  email: string;
  bio: string;
  avatar_url?: string;
}

const Page = () => {
  const { user, refreshProfile } = useAuth(); 

  const [profile, setProfile] = useState<ProfileData>({
    name: user?.name || "Nama Trainer",
    email: user?.email || "",
    bio: user?.bio || "Belum ada bio.",
    avatar_url: user?.avatar_url || "",
  });

  const [formInput, setFormInput] = useState<ProfileData>({ ...profile });
  const [avatarPreview, setAvatarPreview] = useState<string>(user?.avatar_url || "/User.svg");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const newProfileData = {
        name: user.name || "Nama Trainer",
        email: user.email || "",
        bio: user.bio || "Belum ada bio.",
        avatar_url: user.avatar_url || "",
      };
      setProfile(newProfileData);
      setFormInput(newProfileData);
      if (user.avatar_url) {
        setAvatarPreview(user.avatar_url);
      }
    }
  }, [user?.name, user?.email, user?.bio, user?.avatar_url]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ukuran file terlalu besar. Maksimal 2MB.");
        return;
      }

      setSelectedFile(file);
      setFileName(file.name);

      const objectUrl = URL.createObjectURL(file);
      setAvatarPreview(objectUrl);
    }
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSaving(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Sesi Anda telah berakhir. Silakan login ulang.");
        return;
      }

      const formData = new FormData();
      formData.append("name", formInput.name);
      formData.append("email", formInput.email);
      formData.append("bio", formInput.bio);
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      const customHeaders = new Headers();
      customHeaders.append("Authorization", `Bearer ${token}`);

      const response = await fetch(`${BACKEND_URL}/api/dashboard/profile/update`, {
        method: "PUT",
        headers: customHeaders,
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Tidak bisa menyimpan profil. Coba lagi?");

      const updatedAvatar = result.data?.avatar_url || profile.avatar_url;

      setProfile({
        name: formInput.name,
        email: formInput.email,
        bio: formInput.bio,
        avatar_url: updatedAvatar,
      });

      if (updatedAvatar) {
        setAvatarPreview(updatedAvatar);
      }

      setFileName("");
      setSelectedFile(null);
      await refreshProfile();
      
      toast.success("Profil berhasil diperbarui! ✨");
    } catch (error: unknown) {
      console.error(error);
      const message = error instanceof Error ? error.message : "Ada masalah saat menyimpan profil. Coba lagi?";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }, [formInput, profile.avatar_url, selectedFile]);

  const profileDisplayData = useMemo(
    () => ({
      name: profile.name,
      email: profile.email,
      bio: profile.bio,
    }),
    [profile.name, profile.email, profile.bio]
  );

  const formData = useMemo(
    () => ({
      name: formInput.name,
      email: formInput.email,
      bio: formInput.bio,
    }),
    [formInput.name, formInput.email, formInput.bio]
  );

  return (
    <div className="h-auto lg:h-screen w-full bg-yellow-300 text-gray-800 pt-24 flex flex-col lg:overflow-hidden">
      <div className="h-auto lg:h-[calc(100vh-6rem)] w-full flex flex-col lg:flex-row border-t-3 lg:border-t-6 border-yellow-500 lg:overflow-hidden">
        
        <div className="h-auto lg:h-full w-full flex flex-col lg:max-w-xs xl:max-w-md border-yellow-500 border-b-3 lg:border-b-0 border-r-0 lg:border-r-6 shrink-0 py-6 lg:py-0">
          <div className="lg:h-[70%] flex flex-col gap-4 lg:gap-6 items-center justify-center p-4">
            <div className="h-36 w-36 md:h-44 md:w-44 lg:h-50 lg:w-50 relative bg-linear-to-t from-gray-200 to-white border-3 lg:border-6 border-yellow-500 rounded-full overflow-hidden shrink-0">
              <Image
                src={avatarPreview}
                alt="Avatar preview"
                fill
                sizes="(max-width: 768px) 144px, (max-width: 1024px) 176px, 200px"
                priority
                className="object-cover object-center"
              />
            </div>

            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-lg md:text-xl leading-snug">
                Welcome!
                <br />
                <span className="font-title font-bold text-3xl lg:text-4xl text-blue-600 dynamic-text">
                  {profileDisplayData.name}
                </span>
              </h1>
              <p className="text-base text-red-500 font-bold">
                {profileDisplayData.email}
              </p>
              <p className="text-xs md:text-sm text-gray-600 max-w-xs mt-1 leading-relaxed">
                {profileDisplayData.bio}
              </p>
            </div>
          </div>

          <div className="lg:h-[30%] border-t-0 lg:border-t-3 border-yellow-500 flex flex-col items-center justify-center gap-4 px-6 mt-4 lg:mt-0 pt-4 lg:pt-0">
            <Link
              href="/dashboard"
              className="w-full max-w-sm lg:max-w-none text-center font-title font-bold text-lg lg:text-xl py-2.5 lg:py-3 px-4 bg-linear-to-t from-gray-200 to-white border-3 border-yellow-500 text-yellow-600 rounded-xl hover:scale-105 active:scale-95 duration-300 transition-all ease-in-out"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/"
              className="w-full max-w-sm lg:max-w-none text-center font-title font-bold text-lg lg:text-xl py-2.5 lg:py-3 px-4 bg-linear-to-t from-blue-700 to-blue-500 border-3 border-blue-700 text-white rounded-xl hover:scale-105 active:scale-95 duration-300 transition-all ease-in-out"
            >
              Back to Home
            </Link>
          </div>
        </div>

        <div className="flex-1 p-4 md:p-6 lg:p-8 flex flex-col lg:overflow-hidden">
          <div className="mb-6 shrink-0 text-center lg:text-left">
            <h1 className="text-2xl md:text-3xl font-bold font-title text-gray-900">
              Edit Profile
            </h1>
            <p className="text-center lg:text-left text-gray-600 text-xs md:text-sm">
              Kelola informasi detail akun Trainer Anda di sini.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full h-full bg-linear-to-t from-gray-100 to-white border-3 border-yellow-500 rounded-2xl flex flex-col lg:overflow-hidden shadow-xs">
            <div className="flex-1 p-5 md:p-8 flex flex-col gap-6 lg:overflow-y-auto">
              
              <div className="flex flex-col sm:flex-row items-center gap-5 pb-5 border-b border-gray-200">
                <div className="h-20 w-20 relative bg-linear-to-t from-gray-200 to-white border-2 border-yellow-500 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={avatarPreview}
                    alt="Avatar mini preview"
                    fill
                    sizes="80px"
                    priority
                    className="object-cover object-center"
                  />
                </div>

                <div className="flex flex-col items-center sm:items-start gap-1">
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="cursor-pointer font-title font-bold text-xs py-2 px-4 bg-linear-to-t from-gray-200 to-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-yellow-500 hover:text-yellow-600 duration-200 transition-all shadow-xs"
                  >
                    📸 Ganti Foto Profil
                  </label>

                  {fileName ? (
                    <p className="text-[11px] text-green-600 font-medium mt-1 animate-pulse">
                      ✓ Bersiap upload: <span className="underline italic">{fileName}</span>
                    </p>
                  ) : (
                    <p className="text-[11px] text-gray-400 mt-1">
                      Maksimal 2 MB. Ekstensi: JPG, PNG, atau SVG.
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full max-w-2xl flex flex-col gap-5 mx-auto lg:mx-0">
                <div className="flex flex-col gap-1.5">
                  <label className="font-title font-bold text-sm md:text-base text-gray-700">
                    Trainer Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full font-title font-medium text-sm md:text-base px-4 py-2.5 bg-white border-3 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-hidden duration-200"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-title font-bold text-sm md:text-base text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled
                    className="w-full font-title font-medium text-sm md:text-base px-4 py-2.5 bg-gray-100 border-3 border-gray-300 rounded-xl text-gray-500 cursor-not-allowed opacity-75 duration-200"
                  />
                  <p className="text-xs text-gray-500 font-medium mt-1">
                    💡 Email tidak dapat diubah karena terikat permanen pada akun Anda.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-title font-bold text-sm md:text-base text-gray-700">
                    Trainer Bio
                  </label>
                  <textarea
                    rows={4}
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full font-title font-medium text-sm md:text-base px-4 py-2.5 bg-white border-3 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-hidden duration-200 resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="shrink-0 p-4 md:p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row lg:justify-start gap-3 rounded-b-2xl">
              <button
                type="submit"
                disabled={isSaving}
                className={`sm:w-40 text-center font-title font-bold text-base md:text-lg py-2.5 px-6 bg-linear-to-t from-blue-700 to-blue-500 border-3 border-blue-700 text-white rounded-xl duration-300 transition-all ${isSaving ? "opacity-60 cursor-not-allowed hover:scale-100" : "hover:scale-105 active:scale-95 cursor-pointer"}`}
              >
                {isSaving ? "Menyimpan..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;