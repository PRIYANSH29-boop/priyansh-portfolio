"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Network,
  Cpu,
  Layers,
  Atom,
  Workflow,
} from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const focusAreas = [
  {
    Icon: Brain,
    title: "Foundation Models",
    body: "Fine-tuning, LoRA / QLoRA, distillation, alignment & evaluation pipelines.",
    stack: "PyTorch · TRL · DeepSpeed",
    status: "active",
  },
  {
    Icon: Network,
    title: "RAG & Agents",
    body: "Retrieval-augmented systems, vector indices, tool-using autonomous agents.",
    stack: "LangGraph · pgvector · vLLM",
    status: "active",
  },
  {
    Icon: Layers,
    title: "Multimodal",
    body: "Vision + language + time-series fusion for real-world decision systems.",
    stack: "CLIP · ViT · Whisper",
    status: "experiment",
  },
  {
    Icon: Atom,
    title: "Quantitative AI",
    body: "Stochastic models, market microstructure, signal extraction, alpha research.",
    stack: "JAX · NumPy · zipline",
    status: "active",
  },
  {
    Icon: Cpu,
    title: "Inference Systems",
    body: "Low-latency serving, quantization, batching, on-device deployment.",
    stack: "TensorRT · ONNX · Triton",
    status: "shipped",
  },
  {
    Icon: Workflow,
    title: "MLOps",
    body: "Reproducible training, drift monitoring, automated retraining pipelines.",
    stack: "Airflow · MLflow · W&B",
    status: "shipped",
  },
];

export function ResearchLab() {
  return (
    <section
      id="lab"
      className="relative py-28 md:py-40 px-6 md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="05"
          eyebrow="Research Lab"
          title={
            <>
              A personal lab for{" "}
              <span className="italic text-gradient-accent">
                the next decade
              </span>{" "}
              of intelligent software.
            </>
          }
          description="Hover any node to inspect its stack and status. Open experiments across foundation models, retrieval systems, multimodal reasoning, and quantitative AI — built in public, shipped to production."
        />

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {focusAreas.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: 0.05 + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-6 hover:border-white/[0.14] transition-colors duration-500"
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(300px circle at 50% 0%, rgba(91,140,255,0.12), transparent 70%)",
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] grid place-items-center group-hover:border-accent/30 transition-colors">
                    <f.Icon size={17} className="text-accent-soft" />
                  </span>
                  <span
                    className={`font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full border ${
                      f.status === "active"
                        ? "text-signal-green border-signal-green/30 bg-signal-green/5"
                        : f.status === "shipped"
                        ? "text-accent-soft border-accent/30 bg-accent/5"
                        : "text-signal-amber border-signal-amber/30 bg-signal-amber/5"
                    }`}
                  >
                    {f.status}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl text-white tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-ink-200 leading-relaxed">
                  {f.body}
                </p>

                {/* Hover-revealed stack */}
                <div className="mt-4 max-h-0 group-hover:max-h-12 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                  <div className="pt-3 border-t border-white/[0.06] font-mono text-[10px] tracking-[0.16em] uppercase text-ink-300 flex items-center justify-between">
                    <span>{f.stack}</span>
                    <span className="text-accent-soft">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Capability strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-20 relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent p-8 md:p-12"
        >
          <div
            aria-hidden
            className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-accent/15 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.15] mask-fade-b"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-300 mb-5">
                Capability stack
              </p>
              <h3 className="font-display text-3xl md:text-5xl font-light text-gradient leading-[1.05] text-balance">
                From research papers to production endpoints — same week.
              </h3>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              {[
                ["PyTorch", "JAX"],
                ["LangGraph", "vLLM"],
                ["Triton", "Ray"],
                ["Postgres", "pgvector"],
                ["FastAPI", "Next.js"],
                ["Docker", "K8s"],
              ].map(([a, b], i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 font-mono text-[12px] tracking-wider text-ink-100 flex items-center justify-between"
                >
                  <span>{a}</span>
                  <span className="text-ink-300">·</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
