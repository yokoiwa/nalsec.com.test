import { RefObject, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosSend, IoIosSync } from "react-icons/io";

type Form = {
  name: string;
  email: string;
  tel: string;
  service: string;
  note: string;
};
export const ContactForm = ({
  isTopPage,
  scrollToRef,
  serviceName = "その他",
}: {
  isTopPage?: boolean;
  scrollToRef?: RefObject<HTMLDivElement>;
  serviceName?: string;
}) => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sentMessage, setSentMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();
  const onSubmit: SubmitHandler<Form> = async (data) => {
    setIsSending(true);
    setSentMessage("");
    await fetch("https://hyperform.jp/api/async/2g791Dcd/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        reset();
        setSentMessage(
          "送信が完了しました。追って担当者よりご連絡差し上げます。"
        );
        setTimeout(() => {
          setSentMessage("");
        }, 8000);
      })
      .catch(() => {
        setSentMessage(
          "何らかのエラーが発生しました。数分待って再度お試しいただくか、 info@nalsec.com へ直接ご連絡ください。"
        );
      });
    setIsSending(false);
  };

  return (
    <div
      ref={scrollToRef}
      className={
        "flex min-h-screen-small w-full flex-col justify-center bg-black/20 py-32 px-[20px] text-white backdrop-blur " +
        (isTopPage ? "" : "mt-[-20px]")
      }
    >
      <h1 className="mb-8 text-center text-2xl">
        {isTopPage ? "お問い合わせ" : "カタログ請求"}
      </h1>
      {/*<p className="max-w-32 mx-auto my-8">*/}
      {/*  ただいまフォームは調整中です。info@nalsec.com へ直接ご連絡ください。*/}
      {/*</p>*/}
      <form
        className="mx-auto w-full max-w-[600px] space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col">
          <span className="flex p-1">
            お名前<sup className="top-[-.25em] text-xl">*</sup>
          </span>
          <input
            className="rounded-sm border-[.5px] border-white/80 bg-black/40 px-2 py-1 font-sans"
            {...register("name", {
              required: "お名前を入力してください",
              maxLength: 40,
            })}
          />
          {errors.name && (
            <p className="p-1 text-red-200">{errors.name.message}</p>
          )}
        </label>
        <label className="flex flex-col">
          <span className="flex p-1">
            メールアドレス<sup className="top-[-.25em] text-xl">*</sup>
          </span>
          <input
            className="rounded-sm border-[.5px] border-white/80 bg-black/40 px-2 py-1 font-sans"
            {...register("email", {
              required: "メールアドレスを入力してください",
              maxLength: 40,
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+\.[a-zA-Z0-9_.+-]+$/,
                message: "メールアドレスを正しい書式で入力してください",
              },
            })}
          />
          {errors.email && (
            <p className="p-1 text-red-200">{errors.email.message}</p>
          )}
        </label>
        <label className="flex flex-col">
          <span className="flex p-1">
            電話番号<sup className="top-[-.25em] text-xl">*</sup>
          </span>
          <input
            className="rounded-sm border-[.5px] border-white/80 bg-black/40 px-2 py-1 font-sans"
            {...register("tel", {
              required: "電話番号を入力してください",
              maxLength: 40,
              pattern: {
                value: /^[0-9\-+]*$/,
                message: "電話番号は半角数字と+,-の記号のみで入力してください",
              },
            })}
          />
          {errors.tel && (
            <p className="p-1 text-red-200">{errors.tel.message}</p>
          )}
        </label>
        <label className="flex flex-col">
          <span className="flex p-1">サービス・製品</span>
          <input
            className="rounded-sm border-[.5px] border-white/80 bg-black/40 px-2 py-1 font-sans"
            defaultValue={serviceName}
            {...register("service", { required: true, maxLength: 40 })}
          />
        </label>
        <label className="flex flex-col">
          <span className="flex p-1">備考</span>
          <textarea
            className="max-h-[30em] min-h-[15em] rounded-sm border-[.5px] border-white/80 bg-black/40 px-2 py-1 font-sans"
            {...register("note", { required: false, maxLength: 2000 })}
          />
        </label>
        <div className="py-4">
          <button className="mx-auto mt-8 block flex items-center space-x-2 rounded border bg-white/20 py-2 pl-4 pr-6">
            {isSending ? (
              <IoIosSync className="animate-spin size-6" />
            ) : (
              <IoIosSend className="size-6" />
            )}
            <span>送信</span>
          </button>
          {sentMessage.length > 0 && (
            <p className="mx-auto p-4 text-center">{sentMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
};
