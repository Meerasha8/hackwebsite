import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be under 80 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name can only contain letters, spaces, . ' -"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .max(255, "Email too long"),
  mobile: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{7,16}$/, "Enter a valid mobile number (7–15 digits)"),
  teamName: z
    .string()
    .trim()
    .min(2, "Team name must be at least 2 characters")
    .max(50, "Team name must be under 50 characters"),
  members: z.coerce
    .number({ invalid_type_error: "Select team size" })
    .int()
    .min(1, "Minimum 1 member")
    .max(4, "Maximum 4 members per team"),
});

type FormData = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormData, string>>;

const initial = { name: "", email: "", mobile: "", teamName: "", members: "" };

export default function RegisterForm() {
  const [values, setValues] = useState<Record<keyof FormData, string>>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Errors = {};
      result.error.issues.forEach((iss) => {
        const k = iss.path[0] as keyof FormData;
        if (!fieldErrors[k]) fieldErrors[k] = iss.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success(`Welcome to the grid, ${result.data.name}! 🏁`);
      setValues(initial);
      setSubmitting(false);
    }, 600);
  };

  const fieldClass = (k: keyof FormData) =>
    `bg-background border px-4 py-3 font-ui-reg text-sm transition w-full ${
      errors[k] ? "border-racing-red" : "border-racing/30"
    }`;

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-2xl mx-auto text-left grid sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <label htmlFor="name" className="font-ui text-[10px] text-gold block mb-1.5">DRIVER NAME</label>
        <input
          id="name" type="text" autoComplete="name" maxLength={80}
          value={values.name} onChange={set("name")}
          aria-invalid={!!errors.name}
          placeholder="Lewis Hamilton"
          className={fieldClass("name")}
        />
        {errors.name && <p className="font-ui-reg text-xs text-racing-red mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="font-ui text-[10px] text-gold block mb-1.5">EMAIL</label>
        <input
          id="email" type="email" autoComplete="email" maxLength={255}
          value={values.email} onChange={set("email")}
          aria-invalid={!!errors.email}
          placeholder="driver@team.gp"
          className={fieldClass("email")}
        />
        {errors.email && <p className="font-ui-reg text-xs text-racing-red mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="mobile" className="font-ui text-[10px] text-gold block mb-1.5">MOBILE NUMBER</label>
        <input
          id="mobile" type="tel" autoComplete="tel" maxLength={16}
          value={values.mobile} onChange={set("mobile")}
          aria-invalid={!!errors.mobile}
          placeholder="+1 555 123 4567"
          className={fieldClass("mobile")}
        />
        {errors.mobile && <p className="font-ui-reg text-xs text-racing-red mt-1">{errors.mobile}</p>}
      </div>

      <div>
        <label htmlFor="teamName" className="font-ui text-[10px] text-gold block mb-1.5">TEAM NAME</label>
        <input
          id="teamName" type="text" maxLength={50}
          value={values.teamName} onChange={set("teamName")}
          aria-invalid={!!errors.teamName}
          placeholder="Apex Racing"
          className={fieldClass("teamName")}
        />
        {errors.teamName && <p className="font-ui-reg text-xs text-racing-red mt-1">{errors.teamName}</p>}
      </div>

      <div>
        <label htmlFor="members" className="font-ui text-[10px] text-gold block mb-1.5">TEAM SIZE (MAX 4)</label>
        <select
          id="members"
          value={values.members}
          onChange={set("members")}
          aria-invalid={!!errors.members}
          className={fieldClass("members")}
        >
          <option value="">Select team size</option>
          <option value="1">1 — Solo driver</option>
          <option value="2">2 members</option>
          <option value="3">3 members</option>
          <option value="4">4 members</option>
        </select>
        {errors.members && <p className="font-ui-reg text-xs text-racing-red mt-1">{errors.members}</p>}
      </div>

      <div className="sm:col-span-2 flex justify-center mt-2">
        <button type="submit" disabled={submitting} className="btn-primary-f1 disabled:opacity-60">
          {submitting ? "Submitting…" : "Apply →"}
        </button>
      </div>
    </form>
  );
}
