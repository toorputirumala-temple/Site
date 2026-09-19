import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const QuerySection = () => {
  const { lang } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: `New Query from ${formData.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #fed7aa; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
              <div style="background-color: #800808; padding: 24px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">New Temple Query</h1>
                <p style="color: #fed7aa; margin: 8px 0 0 0; font-size: 14px;">You have received a new message</p>
              </div>
              <div style="padding: 32px; background-color: #ffffff;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; width: 100px;">
                      <span style="color: #6b7280; font-weight: bold; font-size: 14px;">Name:</span>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                      <span style="color: #111827; font-size: 16px;">${formData.name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                      <span style="color: #6b7280; font-weight: bold; font-size: 14px;">Email:</span>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                      <a href="mailto:${formData.email}" style="color: #e35d10; text-decoration: none; font-size: 16px;">${formData.email}</a>
                    </td>
                  </tr>
                </table>
                
                <div style="margin-top: 28px;">
                  <span style="color: #6b7280; font-weight: bold; font-size: 14px; display: block; margin-bottom: 8px;">Query Message:</span>
                  <div style="background-color: #fff7e7; padding: 20px; border-left: 4px solid #e35d10; border-radius: 4px; color: #374151; line-height: 1.6; font-size: 15px;">
                    ${formData.query.replace(/\n/g, '<br/>')}
                  </div>
                </div>
              </div>
              <div style="background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">This email was sent from the Temple Website Query Form.</p>
              </div>
            </div>
          `,
          replyTo: formData.email,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", query: "" });
        setHasSubmitted(true);
        // Show success state briefly then collapse
        setTimeout(() => {
          setIsExpanded(false);
          setStatus("");
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Failed to send query:", error);
      setStatus("error");
    }
  };

  const labels = lang === 'en' ? {
    title: "Have a Query?",
    subtitle: "Send us a message and we will get back to you",
    askButton: "Ask a Query",
    rewriteButton: "Rewrite Query",
    name: "Your Name",
    email: "Email Address",
    query: "Your Query",
    submit: "Submit Query",
    submitting: "Submitting...",
    success: "Query submitted successfully!",
    error: "Failed to submit query. Please try again.",
    cancel: "Cancel"
  } : {
    title: "సందేహాలు ఉన్నాయా?",
    subtitle: "మాకు సందేశం పంపండి, మేము మీకు ప్రత్యుత్తరం ఇస్తాము",
    askButton: "ప్రశ్న అడగండి",
    rewriteButton: "మళ్లీ అడగండి",
    name: "మీ పేరు",
    email: "ఇమెయిల్ అడ్రస్",
    query: "మీ సందేహం",
    submit: "సమర్పించండి",
    submitting: "సమర్పిస్తున్నాము...",
    success: "సందేహం విజయవంతంగా సమర్పించబడింది!",
    error: "సందేహం సమర్పించడంలో విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.",
    cancel: "రద్దు చేయండి"
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#fed7aa] to-[#fff7e7] py-16 px-4 sm:px-8 border-t border-amber-200 relative">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 shadow-xl border border-amber-200">
        
        {!isExpanded ? (
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black text-[#800808] mb-4" style={{ fontFamily: "'Yatra One', sans-serif" }}>
              {labels.title}
            </h2>
            <p className="text-gray-600 font-medium mb-6">{labels.subtitle}</p>
            <button
              onClick={() => setIsExpanded(true)}
              className="bg-gradient-to-r from-[#e35d10] to-[#800808] hover:from-[#c45c00] hover:to-[#600606] text-white font-bold py-3 px-8 rounded-xl shadow-lg transform transition hover:-translate-y-1"
            >
              {hasSubmitted ? labels.rewriteButton : labels.askButton}
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-[#800808]" style={{ fontFamily: "'Yatra One', sans-serif" }}>
                {labels.title}
              </h2>
              <p className="text-gray-600 mt-2 font-medium">{labels.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">{labels.name}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-[#f47728] focus:border-transparent transition-all bg-amber-50/30"
                  placeholder={labels.name}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">{labels.email}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-[#f47728] focus:border-transparent transition-all bg-amber-50/30"
                  placeholder={labels.email}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">{labels.query}</label>
                <textarea
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-[#f47728] focus:border-transparent transition-all bg-amber-50/30 resize-none"
                  placeholder={labels.query}
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="w-full sm:w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-xl shadow transition"
                >
                  {labels.cancel}
                </button>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-2/3 bg-gradient-to-r from-[#e35d10] to-[#800808] hover:from-[#c45c00] hover:to-[#600606] text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {status === "submitting" ? labels.submitting : labels.submit}
                </button>
              </div>

              {status === "success" && (
                <p className="text-green-600 font-bold text-center mt-4 bg-green-50 py-2 rounded-lg border border-green-200">
                  {labels.success}
                </p>
              )}
              {status === "error" && (
                <p className="text-red-600 font-bold text-center mt-4 bg-red-50 py-2 rounded-lg border border-red-200">
                  {labels.error}
                </p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuerySection;
