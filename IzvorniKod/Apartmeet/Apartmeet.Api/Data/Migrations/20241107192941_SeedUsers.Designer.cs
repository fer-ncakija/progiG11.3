﻿// <auto-generated />
using System;
using Apartmeet.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Apartmeet.Api.Data.Migrations
{
    [DbContext(typeof(ApartmeetContext))]
    [Migration("20241107192941_SeedUsers")]
    partial class SeedUsers
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.10");

            modelBuilder.Entity("Apartmeet.Api.Entities.AgendaPoint", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("HasLegalEffect")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MeetingId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Outcome")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("MeetingId");

                    b.ToTable("AgendaPoints");
                });

            modelBuilder.Entity("Apartmeet.Api.Entities.Meeting", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Place")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("ScheduledDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Summary")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Meetings");
                });

            modelBuilder.Entity("Apartmeet.Api.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "",
                            Password = "admin",
                            Role = "admin",
                            Username = "admin"
                        });
                });

            modelBuilder.Entity("Apartmeet.Api.Entities.UserMeeting", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MeetingId")
                        .HasColumnType("INTEGER");

                    b.HasKey("UserId", "MeetingId");

                    b.HasIndex("MeetingId");

                    b.ToTable("UserMeetings");
                });

            modelBuilder.Entity("Apartmeet.Api.Entities.AgendaPoint", b =>
                {
                    b.HasOne("Apartmeet.Api.Entities.Meeting", "Meeting")
                        .WithMany("AgendaPoints")
                        .HasForeignKey("MeetingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Meeting");
                });

            modelBuilder.Entity("Apartmeet.Api.Entities.UserMeeting", b =>
                {
                    b.HasOne("Apartmeet.Api.Entities.Meeting", "Meeting")
                        .WithMany("UserMeetings")
                        .HasForeignKey("MeetingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Apartmeet.Api.Entities.User", "User")
                        .WithMany("UserMeetings")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Meeting");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Apartmeet.Api.Entities.Meeting", b =>
                {
                    b.Navigation("AgendaPoints");

                    b.Navigation("UserMeetings");
                });

            modelBuilder.Entity("Apartmeet.Api.Entities.User", b =>
                {
                    b.Navigation("UserMeetings");
                });
#pragma warning restore 612, 618
        }
    }
}
