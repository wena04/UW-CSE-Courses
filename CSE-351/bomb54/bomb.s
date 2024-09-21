
bomb:     file format elf64-x86-64


Disassembly of section .init:

0000000000401000 <_init>:
  401000:	f3 0f 1e fa          	endbr64 
  401004:	48 83 ec 08          	sub    $0x8,%rsp
  401008:	48 8b 05 e1 2f 00 00 	mov    0x2fe1(%rip),%rax        # 403ff0 <__gmon_start__>
  40100f:	48 85 c0             	test   %rax,%rax
  401012:	74 02                	je     401016 <_init+0x16>
  401014:	ff d0                	callq  *%rax
  401016:	48 83 c4 08          	add    $0x8,%rsp
  40101a:	c3                   	retq   

Disassembly of section .plt:

0000000000401020 <.plt>:
  401020:	ff 35 e2 2f 00 00    	pushq  0x2fe2(%rip)        # 404008 <_GLOBAL_OFFSET_TABLE_+0x8>
  401026:	ff 25 e4 2f 00 00    	jmpq   *0x2fe4(%rip)        # 404010 <_GLOBAL_OFFSET_TABLE_+0x10>
  40102c:	0f 1f 40 00          	nopl   0x0(%rax)

0000000000401030 <getenv@plt>:
  401030:	ff 25 e2 2f 00 00    	jmpq   *0x2fe2(%rip)        # 404018 <getenv@GLIBC_2.2.5>
  401036:	68 00 00 00 00       	pushq  $0x0
  40103b:	e9 e0 ff ff ff       	jmpq   401020 <.plt>

0000000000401040 <strcpy@plt>:
  401040:	ff 25 da 2f 00 00    	jmpq   *0x2fda(%rip)        # 404020 <strcpy@GLIBC_2.2.5>
  401046:	68 01 00 00 00       	pushq  $0x1
  40104b:	e9 d0 ff ff ff       	jmpq   401020 <.plt>

0000000000401050 <puts@plt>:
  401050:	ff 25 d2 2f 00 00    	jmpq   *0x2fd2(%rip)        # 404028 <puts@GLIBC_2.2.5>
  401056:	68 02 00 00 00       	pushq  $0x2
  40105b:	e9 c0 ff ff ff       	jmpq   401020 <.plt>

0000000000401060 <fclose@plt>:
  401060:	ff 25 ca 2f 00 00    	jmpq   *0x2fca(%rip)        # 404030 <fclose@GLIBC_2.2.5>
  401066:	68 03 00 00 00       	pushq  $0x3
  40106b:	e9 b0 ff ff ff       	jmpq   401020 <.plt>

0000000000401070 <strlen@plt>:
  401070:	ff 25 c2 2f 00 00    	jmpq   *0x2fc2(%rip)        # 404038 <strlen@GLIBC_2.2.5>
  401076:	68 04 00 00 00       	pushq  $0x4
  40107b:	e9 a0 ff ff ff       	jmpq   401020 <.plt>

0000000000401080 <system@plt>:
  401080:	ff 25 ba 2f 00 00    	jmpq   *0x2fba(%rip)        # 404040 <system@GLIBC_2.2.5>
  401086:	68 05 00 00 00       	pushq  $0x5
  40108b:	e9 90 ff ff ff       	jmpq   401020 <.plt>

0000000000401090 <printf@plt>:
  401090:	ff 25 b2 2f 00 00    	jmpq   *0x2fb2(%rip)        # 404048 <printf@GLIBC_2.2.5>
  401096:	68 06 00 00 00       	pushq  $0x6
  40109b:	e9 80 ff ff ff       	jmpq   401020 <.plt>

00000000004010a0 <rewind@plt>:
  4010a0:	ff 25 aa 2f 00 00    	jmpq   *0x2faa(%rip)        # 404050 <rewind@GLIBC_2.2.5>
  4010a6:	68 07 00 00 00       	pushq  $0x7
  4010ab:	e9 70 ff ff ff       	jmpq   401020 <.plt>

00000000004010b0 <dup@plt>:
  4010b0:	ff 25 a2 2f 00 00    	jmpq   *0x2fa2(%rip)        # 404058 <dup@GLIBC_2.2.5>
  4010b6:	68 08 00 00 00       	pushq  $0x8
  4010bb:	e9 60 ff ff ff       	jmpq   401020 <.plt>

00000000004010c0 <close@plt>:
  4010c0:	ff 25 9a 2f 00 00    	jmpq   *0x2f9a(%rip)        # 404060 <close@GLIBC_2.2.5>
  4010c6:	68 09 00 00 00       	pushq  $0x9
  4010cb:	e9 50 ff ff ff       	jmpq   401020 <.plt>

00000000004010d0 <fputc@plt>:
  4010d0:	ff 25 92 2f 00 00    	jmpq   *0x2f92(%rip)        # 404068 <fputc@GLIBC_2.2.5>
  4010d6:	68 0a 00 00 00       	pushq  $0xa
  4010db:	e9 40 ff ff ff       	jmpq   401020 <.plt>

00000000004010e0 <fgets@plt>:
  4010e0:	ff 25 8a 2f 00 00    	jmpq   *0x2f8a(%rip)        # 404070 <fgets@GLIBC_2.2.5>
  4010e6:	68 0b 00 00 00       	pushq  $0xb
  4010eb:	e9 30 ff ff ff       	jmpq   401020 <.plt>

00000000004010f0 <tmpfile@plt>:
  4010f0:	ff 25 82 2f 00 00    	jmpq   *0x2f82(%rip)        # 404078 <tmpfile@GLIBC_2.2.5>
  4010f6:	68 0c 00 00 00       	pushq  $0xc
  4010fb:	e9 20 ff ff ff       	jmpq   401020 <.plt>

0000000000401100 <signal@plt>:
  401100:	ff 25 7a 2f 00 00    	jmpq   *0x2f7a(%rip)        # 404080 <signal@GLIBC_2.2.5>
  401106:	68 0d 00 00 00       	pushq  $0xd
  40110b:	e9 10 ff ff ff       	jmpq   401020 <.plt>

0000000000401110 <gethostbyname@plt>:
  401110:	ff 25 72 2f 00 00    	jmpq   *0x2f72(%rip)        # 404088 <gethostbyname@GLIBC_2.2.5>
  401116:	68 0e 00 00 00       	pushq  $0xe
  40111b:	e9 00 ff ff ff       	jmpq   401020 <.plt>

0000000000401120 <fprintf@plt>:
  401120:	ff 25 6a 2f 00 00    	jmpq   *0x2f6a(%rip)        # 404090 <fprintf@GLIBC_2.2.5>
  401126:	68 0f 00 00 00       	pushq  $0xf
  40112b:	e9 f0 fe ff ff       	jmpq   401020 <.plt>

0000000000401130 <strtol@plt>:
  401130:	ff 25 62 2f 00 00    	jmpq   *0x2f62(%rip)        # 404098 <strtol@GLIBC_2.2.5>
  401136:	68 10 00 00 00       	pushq  $0x10
  40113b:	e9 e0 fe ff ff       	jmpq   401020 <.plt>

0000000000401140 <fflush@plt>:
  401140:	ff 25 5a 2f 00 00    	jmpq   *0x2f5a(%rip)        # 4040a0 <fflush@GLIBC_2.2.5>
  401146:	68 11 00 00 00       	pushq  $0x11
  40114b:	e9 d0 fe ff ff       	jmpq   401020 <.plt>

0000000000401150 <__isoc99_sscanf@plt>:
  401150:	ff 25 52 2f 00 00    	jmpq   *0x2f52(%rip)        # 4040a8 <__isoc99_sscanf@GLIBC_2.7>
  401156:	68 12 00 00 00       	pushq  $0x12
  40115b:	e9 c0 fe ff ff       	jmpq   401020 <.plt>

0000000000401160 <memmove@plt>:
  401160:	ff 25 4a 2f 00 00    	jmpq   *0x2f4a(%rip)        # 4040b0 <memmove@GLIBC_2.2.5>
  401166:	68 13 00 00 00       	pushq  $0x13
  40116b:	e9 b0 fe ff ff       	jmpq   401020 <.plt>

0000000000401170 <cuserid@plt>:
  401170:	ff 25 42 2f 00 00    	jmpq   *0x2f42(%rip)        # 4040b8 <cuserid@GLIBC_2.2.5>
  401176:	68 14 00 00 00       	pushq  $0x14
  40117b:	e9 a0 fe ff ff       	jmpq   401020 <.plt>

0000000000401180 <fopen@plt>:
  401180:	ff 25 3a 2f 00 00    	jmpq   *0x2f3a(%rip)        # 4040c0 <fopen@GLIBC_2.2.5>
  401186:	68 15 00 00 00       	pushq  $0x15
  40118b:	e9 90 fe ff ff       	jmpq   401020 <.plt>

0000000000401190 <sprintf@plt>:
  401190:	ff 25 32 2f 00 00    	jmpq   *0x2f32(%rip)        # 4040c8 <sprintf@GLIBC_2.2.5>
  401196:	68 16 00 00 00       	pushq  $0x16
  40119b:	e9 80 fe ff ff       	jmpq   401020 <.plt>

00000000004011a0 <exit@plt>:
  4011a0:	ff 25 2a 2f 00 00    	jmpq   *0x2f2a(%rip)        # 4040d0 <exit@GLIBC_2.2.5>
  4011a6:	68 17 00 00 00       	pushq  $0x17
  4011ab:	e9 70 fe ff ff       	jmpq   401020 <.plt>

00000000004011b0 <connect@plt>:
  4011b0:	ff 25 22 2f 00 00    	jmpq   *0x2f22(%rip)        # 4040d8 <connect@GLIBC_2.2.5>
  4011b6:	68 18 00 00 00       	pushq  $0x18
  4011bb:	e9 60 fe ff ff       	jmpq   401020 <.plt>

00000000004011c0 <fwrite@plt>:
  4011c0:	ff 25 1a 2f 00 00    	jmpq   *0x2f1a(%rip)        # 4040e0 <fwrite@GLIBC_2.2.5>
  4011c6:	68 19 00 00 00       	pushq  $0x19
  4011cb:	e9 50 fe ff ff       	jmpq   401020 <.plt>

00000000004011d0 <sleep@plt>:
  4011d0:	ff 25 12 2f 00 00    	jmpq   *0x2f12(%rip)        # 4040e8 <sleep@GLIBC_2.2.5>
  4011d6:	68 1a 00 00 00       	pushq  $0x1a
  4011db:	e9 40 fe ff ff       	jmpq   401020 <.plt>

00000000004011e0 <__ctype_b_loc@plt>:
  4011e0:	ff 25 0a 2f 00 00    	jmpq   *0x2f0a(%rip)        # 4040f0 <__ctype_b_loc@GLIBC_2.3>
  4011e6:	68 1b 00 00 00       	pushq  $0x1b
  4011eb:	e9 30 fe ff ff       	jmpq   401020 <.plt>

00000000004011f0 <socket@plt>:
  4011f0:	ff 25 02 2f 00 00    	jmpq   *0x2f02(%rip)        # 4040f8 <socket@GLIBC_2.2.5>
  4011f6:	68 1c 00 00 00       	pushq  $0x1c
  4011fb:	e9 20 fe ff ff       	jmpq   401020 <.plt>

Disassembly of section .text:

0000000000401200 <_start>:
  401200:	f3 0f 1e fa          	endbr64 
  401204:	31 ed                	xor    %ebp,%ebp
  401206:	49 89 d1             	mov    %rdx,%r9
  401209:	5e                   	pop    %rsi
  40120a:	48 89 e2             	mov    %rsp,%rdx
  40120d:	48 83 e4 f0          	and    $0xfffffffffffffff0,%rsp
  401211:	50                   	push   %rax
  401212:	54                   	push   %rsp
  401213:	45 31 c0             	xor    %r8d,%r8d
  401216:	31 c9                	xor    %ecx,%ecx
  401218:	48 c7 c7 e6 12 40 00 	mov    $0x4012e6,%rdi
  40121f:	ff 15 bb 2d 00 00    	callq  *0x2dbb(%rip)        # 403fe0 <__libc_start_main@GLIBC_2.34>
  401225:	f4                   	hlt    
  401226:	66 2e 0f 1f 84 00 00 	nopw   %cs:0x0(%rax,%rax,1)
  40122d:	00 00 00 

0000000000401230 <_dl_relocate_static_pie>:
  401230:	f3 0f 1e fa          	endbr64 
  401234:	c3                   	retq   
  401235:	66 2e 0f 1f 84 00 00 	nopw   %cs:0x0(%rax,%rax,1)
  40123c:	00 00 00 
  40123f:	90                   	nop

0000000000401240 <deregister_tm_clones>:
  401240:	48 8d 3d f9 37 00 00 	lea    0x37f9(%rip),%rdi        # 404a40 <stdout@@GLIBC_2.2.5>
  401247:	48 8d 05 f2 37 00 00 	lea    0x37f2(%rip),%rax        # 404a40 <stdout@@GLIBC_2.2.5>
  40124e:	48 39 f8             	cmp    %rdi,%rax
  401251:	74 15                	je     401268 <deregister_tm_clones+0x28>
  401253:	48 8b 05 8e 2d 00 00 	mov    0x2d8e(%rip),%rax        # 403fe8 <_ITM_deregisterTMCloneTable>
  40125a:	48 85 c0             	test   %rax,%rax
  40125d:	74 09                	je     401268 <deregister_tm_clones+0x28>
  40125f:	ff e0                	jmpq   *%rax
  401261:	0f 1f 80 00 00 00 00 	nopl   0x0(%rax)
  401268:	c3                   	retq   
  401269:	0f 1f 80 00 00 00 00 	nopl   0x0(%rax)

0000000000401270 <register_tm_clones>:
  401270:	48 8d 3d c9 37 00 00 	lea    0x37c9(%rip),%rdi        # 404a40 <stdout@@GLIBC_2.2.5>
  401277:	48 8d 35 c2 37 00 00 	lea    0x37c2(%rip),%rsi        # 404a40 <stdout@@GLIBC_2.2.5>
  40127e:	48 29 fe             	sub    %rdi,%rsi
  401281:	48 89 f0             	mov    %rsi,%rax
  401284:	48 c1 ee 3f          	shr    $0x3f,%rsi
  401288:	48 c1 f8 03          	sar    $0x3,%rax
  40128c:	48 01 c6             	add    %rax,%rsi
  40128f:	48 d1 fe             	sar    %rsi
  401292:	74 14                	je     4012a8 <register_tm_clones+0x38>
  401294:	48 8b 05 5d 2d 00 00 	mov    0x2d5d(%rip),%rax        # 403ff8 <_ITM_registerTMCloneTable>
  40129b:	48 85 c0             	test   %rax,%rax
  40129e:	74 08                	je     4012a8 <register_tm_clones+0x38>
  4012a0:	ff e0                	jmpq   *%rax
  4012a2:	66 0f 1f 44 00 00    	nopw   0x0(%rax,%rax,1)
  4012a8:	c3                   	retq   
  4012a9:	0f 1f 80 00 00 00 00 	nopl   0x0(%rax)

00000000004012b0 <__do_global_dtors_aux>:
  4012b0:	f3 0f 1e fa          	endbr64 
  4012b4:	80 3d 9d 37 00 00 00 	cmpb   $0x0,0x379d(%rip)        # 404a58 <completed.0>
  4012bb:	75 13                	jne    4012d0 <__do_global_dtors_aux+0x20>
  4012bd:	55                   	push   %rbp
  4012be:	48 89 e5             	mov    %rsp,%rbp
  4012c1:	e8 7a ff ff ff       	callq  401240 <deregister_tm_clones>
  4012c6:	c6 05 8b 37 00 00 01 	movb   $0x1,0x378b(%rip)        # 404a58 <completed.0>
  4012cd:	5d                   	pop    %rbp
  4012ce:	c3                   	retq   
  4012cf:	90                   	nop
  4012d0:	c3                   	retq   
  4012d1:	66 66 2e 0f 1f 84 00 	data16 nopw %cs:0x0(%rax,%rax,1)
  4012d8:	00 00 00 00 
  4012dc:	0f 1f 40 00          	nopl   0x0(%rax)

00000000004012e0 <frame_dummy>:
  4012e0:	f3 0f 1e fa          	endbr64 
  4012e4:	eb 8a                	jmp    401270 <register_tm_clones>

00000000004012e6 <main>:
  4012e6:	53                   	push   %rbx
  4012e7:	83 ff 01             	cmp    $0x1,%edi
  4012ea:	0f 84 fc 00 00 00    	je     4013ec <main+0x106>
  4012f0:	48 89 f3             	mov    %rsi,%rbx
  4012f3:	83 ff 02             	cmp    $0x2,%edi
  4012f6:	0f 85 1e 01 00 00    	jne    40141a <main+0x134>
  4012fc:	48 8b 7e 08          	mov    0x8(%rsi),%rdi
  401300:	be 3f 24 40 00       	mov    $0x40243f,%esi
  401305:	e8 76 fe ff ff       	callq  401180 <fopen@plt>
  40130a:	48 89 05 4f 37 00 00 	mov    %rax,0x374f(%rip)        # 404a60 <infile>
  401311:	48 85 c0             	test   %rax,%rax
  401314:	0f 84 e5 00 00 00    	je     4013ff <main+0x119>
  40131a:	e8 97 05 00 00       	callq  4018b6 <initialize_bomb>
  40131f:	bf 78 20 40 00       	mov    $0x402078,%edi
  401324:	e8 27 fd ff ff       	callq  401050 <puts@plt>
  401329:	bf b8 20 40 00       	mov    $0x4020b8,%edi
  40132e:	e8 1d fd ff ff       	callq  401050 <puts@plt>
  401333:	e8 aa 08 00 00       	callq  401be2 <read_line>
  401338:	48 89 c7             	mov    %rax,%rdi
  40133b:	e8 f6 00 00 00       	callq  401436 <phase_1>
  401340:	e8 7d 09 00 00       	callq  401cc2 <phase_defused>
  401345:	bf e8 20 40 00       	mov    $0x4020e8,%edi
  40134a:	e8 01 fd ff ff       	callq  401050 <puts@plt>
  40134f:	e8 8e 08 00 00       	callq  401be2 <read_line>
  401354:	48 89 c7             	mov    %rax,%rdi
  401357:	e8 f8 00 00 00       	callq  401454 <phase_2>
  40135c:	e8 61 09 00 00       	callq  401cc2 <phase_defused>
  401361:	bf 47 20 40 00       	mov    $0x402047,%edi
  401366:	e8 e5 fc ff ff       	callq  401050 <puts@plt>
  40136b:	e8 72 08 00 00       	callq  401be2 <read_line>
  401370:	48 89 c7             	mov    %rax,%rdi
  401373:	e8 21 01 00 00       	callq  401499 <phase_3>
  401378:	e8 45 09 00 00       	callq  401cc2 <phase_defused>
  40137d:	bf 65 20 40 00       	mov    $0x402065,%edi
  401382:	e8 c9 fc ff ff       	callq  401050 <puts@plt>
  401387:	e8 56 08 00 00       	callq  401be2 <read_line>
  40138c:	48 89 c7             	mov    %rax,%rdi
  40138f:	e8 af 01 00 00       	callq  401543 <phase_4>
  401394:	e8 29 09 00 00       	callq  401cc2 <phase_defused>
  401399:	bf 18 21 40 00       	mov    $0x402118,%edi
  40139e:	e8 ad fc ff ff       	callq  401050 <puts@plt>
  4013a3:	e8 3a 08 00 00       	callq  401be2 <read_line>
  4013a8:	48 89 c7             	mov    %rax,%rdi
  4013ab:	e8 d6 01 00 00       	callq  401586 <phase_5>
  4013b0:	e8 0d 09 00 00       	callq  401cc2 <phase_defused>
  4013b5:	bf 40 21 40 00       	mov    $0x402140,%edi
  4013ba:	e8 91 fc ff ff       	callq  401050 <puts@plt>
  4013bf:	bf 78 21 40 00       	mov    $0x402178,%edi
  4013c4:	e8 87 fc ff ff       	callq  401050 <puts@plt>
  4013c9:	bf b8 21 40 00       	mov    $0x4021b8,%edi
  4013ce:	e8 7d fc ff ff       	callq  401050 <puts@plt>
  4013d3:	e8 0a 08 00 00       	callq  401be2 <read_line>
  4013d8:	48 89 c7             	mov    %rax,%rdi
  4013db:	e8 52 02 00 00       	callq  401632 <phase_6>
  4013e0:	e8 dd 08 00 00       	callq  401cc2 <phase_defused>
  4013e5:	b8 00 00 00 00       	mov    $0x0,%eax
  4013ea:	5b                   	pop    %rbx
  4013eb:	c3                   	retq   
  4013ec:	48 8b 05 5d 36 00 00 	mov    0x365d(%rip),%rax        # 404a50 <stdin@@GLIBC_2.2.5>
  4013f3:	48 89 05 66 36 00 00 	mov    %rax,0x3666(%rip)        # 404a60 <infile>
  4013fa:	e9 1b ff ff ff       	jmpq   40131a <main+0x34>
  4013ff:	48 8b 53 08          	mov    0x8(%rbx),%rdx
  401403:	48 8b 33             	mov    (%rbx),%rsi
  401406:	bf 10 20 40 00       	mov    $0x402010,%edi
  40140b:	e8 80 fc ff ff       	callq  401090 <printf@plt>
  401410:	bf 08 00 00 00       	mov    $0x8,%edi
  401415:	e8 86 fd ff ff       	callq  4011a0 <exit@plt>
  40141a:	48 8b 36             	mov    (%rsi),%rsi
  40141d:	bf 2d 20 40 00       	mov    $0x40202d,%edi
  401422:	b8 00 00 00 00       	mov    $0x0,%eax
  401427:	e8 64 fc ff ff       	callq  401090 <printf@plt>
  40142c:	bf 08 00 00 00       	mov    $0x8,%edi
  401431:	e8 6a fd ff ff       	callq  4011a0 <exit@plt>

0000000000401436 <phase_1>:
  401436:	48 83 ec 08          	sub    $0x8,%rsp
  40143a:	be f8 21 40 00       	mov    $0x4021f8,%esi
  40143f:	e8 4f 03 00 00       	callq  401793 <strings_not_equal>
  401444:	85 c0                	test   %eax,%eax
  401446:	75 05                	jne    40144d <phase_1+0x17>
  401448:	48 83 c4 08          	add    $0x8,%rsp
  40144c:	c3                   	retq   
  40144d:	e8 2f 07 00 00       	callq  401b81 <explode_bomb>
  401452:	eb f4                	jmp    401448 <phase_1+0x12>

0000000000401454 <phase_2>:
  401454:	53                   	push   %rbx
  401455:	48 83 ec 20          	sub    $0x20,%rsp
  401459:	48 89 e6             	mov    %rsp,%rsi
  40145c:	e8 42 07 00 00       	callq  401ba3 <read_six_numbers>
  401461:	83 3c 24 01          	cmpl   $0x1,(%rsp)
  401465:	75 07                	jne    40146e <phase_2+0x1a>
  401467:	bb 02 00 00 00       	mov    $0x2,%ebx
  40146c:	eb 11                	jmp    40147f <phase_2+0x2b>
  40146e:	e8 0e 07 00 00       	callq  401b81 <explode_bomb>
  401473:	eb f2                	jmp    401467 <phase_2+0x13>
  401475:	48 83 c3 01          	add    $0x1,%rbx
  401479:	48 83 fb 07          	cmp    $0x7,%rbx
  40147d:	74 14                	je     401493 <phase_2+0x3f>
  40147f:	89 d8                	mov    %ebx,%eax
  401481:	0f af 44 9c f8       	imul   -0x8(%rsp,%rbx,4),%eax
  401486:	39 44 9c fc          	cmp    %eax,-0x4(%rsp,%rbx,4)
  40148a:	74 e9                	je     401475 <phase_2+0x21>
  40148c:	e8 f0 06 00 00       	callq  401b81 <explode_bomb>
  401491:	eb e2                	jmp    401475 <phase_2+0x21>
  401493:	48 83 c4 20          	add    $0x20,%rsp
  401497:	5b                   	pop    %rbx
  401498:	c3                   	retq   

0000000000401499 <phase_3>:
  401499:	48 83 ec 18          	sub    $0x18,%rsp
  40149d:	48 8d 4c 24 08       	lea    0x8(%rsp),%rcx
  4014a2:	48 8d 54 24 0c       	lea    0xc(%rsp),%rdx
  4014a7:	be 73 25 40 00       	mov    $0x402573,%esi
  4014ac:	b8 00 00 00 00       	mov    $0x0,%eax
  4014b1:	e8 9a fc ff ff       	callq  401150 <__isoc99_sscanf@plt>
  4014b6:	83 f8 01             	cmp    $0x1,%eax
  4014b9:	7e 12                	jle    4014cd <phase_3+0x34>
  4014bb:	83 7c 24 0c 07       	cmpl   $0x7,0xc(%rsp)
  4014c0:	77 4c                	ja     40150e <phase_3+0x75>
  4014c2:	8b 44 24 0c          	mov    0xc(%rsp),%eax
  4014c6:	ff 24 c5 60 22 40 00 	jmpq   *0x402260(,%rax,8)
  4014cd:	e8 af 06 00 00       	callq  401b81 <explode_bomb>
  4014d2:	eb e7                	jmp    4014bb <phase_3+0x22>
  4014d4:	b8 71 02 00 00       	mov    $0x271,%eax
  4014d9:	39 44 24 08          	cmp    %eax,0x8(%rsp)
  4014dd:	75 42                	jne    401521 <phase_3+0x88>
  4014df:	48 83 c4 18          	add    $0x18,%rsp
  4014e3:	c3                   	retq   
  4014e4:	b8 34 03 00 00       	mov    $0x334,%eax
  4014e9:	eb ee                	jmp    4014d9 <phase_3+0x40>
  4014eb:	b8 e3 02 00 00       	mov    $0x2e3,%eax
  4014f0:	eb e7                	jmp    4014d9 <phase_3+0x40>
  4014f2:	b8 56 01 00 00       	mov    $0x156,%eax
  4014f7:	eb e0                	jmp    4014d9 <phase_3+0x40>
  4014f9:	b8 a6 00 00 00       	mov    $0xa6,%eax
  4014fe:	eb d9                	jmp    4014d9 <phase_3+0x40>
  401500:	b8 d9 03 00 00       	mov    $0x3d9,%eax
  401505:	eb d2                	jmp    4014d9 <phase_3+0x40>
  401507:	b8 ea 00 00 00       	mov    $0xea,%eax
  40150c:	eb cb                	jmp    4014d9 <phase_3+0x40>
  40150e:	e8 6e 06 00 00       	callq  401b81 <explode_bomb>
  401513:	b8 00 00 00 00       	mov    $0x0,%eax
  401518:	eb bf                	jmp    4014d9 <phase_3+0x40>
  40151a:	b8 af 02 00 00       	mov    $0x2af,%eax
  40151f:	eb b8                	jmp    4014d9 <phase_3+0x40>
  401521:	e8 5b 06 00 00       	callq  401b81 <explode_bomb>
  401526:	eb b7                	jmp    4014df <phase_3+0x46>

0000000000401528 <func4>:
  401528:	b8 01 00 00 00       	mov    $0x1,%eax
  40152d:	83 ff 01             	cmp    $0x1,%edi
  401530:	7e 10                	jle    401542 <func4+0x1a>
  401532:	53                   	push   %rbx
  401533:	89 fb                	mov    %edi,%ebx
  401535:	8d 7f ff             	lea    -0x1(%rdi),%edi
  401538:	e8 eb ff ff ff       	callq  401528 <func4>
  40153d:	0f af c3             	imul   %ebx,%eax
  401540:	5b                   	pop    %rbx
  401541:	c3                   	retq   
  401542:	c3                   	retq   

0000000000401543 <phase_4>:
  401543:	48 83 ec 18          	sub    $0x18,%rsp
  401547:	48 8d 54 24 0c       	lea    0xc(%rsp),%rdx
  40154c:	be 76 25 40 00       	mov    $0x402576,%esi
  401551:	b8 00 00 00 00       	mov    $0x0,%eax
  401556:	e8 f5 fb ff ff       	callq  401150 <__isoc99_sscanf@plt>
  40155b:	83 f8 01             	cmp    $0x1,%eax
  40155e:	75 07                	jne    401567 <phase_4+0x24>
  401560:	83 7c 24 0c 00       	cmpl   $0x0,0xc(%rsp)
  401565:	7f 05                	jg     40156c <phase_4+0x29>
  401567:	e8 15 06 00 00       	callq  401b81 <explode_bomb>
  40156c:	8b 7c 24 0c          	mov    0xc(%rsp),%edi
  401570:	e8 b3 ff ff ff       	callq  401528 <func4>
  401575:	83 f8 78             	cmp    $0x78,%eax
  401578:	75 05                	jne    40157f <phase_4+0x3c>
  40157a:	48 83 c4 18          	add    $0x18,%rsp
  40157e:	c3                   	retq   
  40157f:	e8 fd 05 00 00       	callq  401b81 <explode_bomb>
  401584:	eb f4                	jmp    40157a <phase_4+0x37>

0000000000401586 <phase_5>:
  401586:	53                   	push   %rbx
  401587:	48 89 fb             	mov    %rdi,%rbx
  40158a:	e8 e7 01 00 00       	callq  401776 <string_length>
  40158f:	83 f8 06             	cmp    $0x6,%eax
  401592:	75 29                	jne    4015bd <phase_5+0x37>
  401594:	48 89 d8             	mov    %rbx,%rax
  401597:	48 8d 7b 06          	lea    0x6(%rbx),%rdi
  40159b:	b9 00 00 00 00       	mov    $0x0,%ecx
  4015a0:	0f b6 10             	movzbl (%rax),%edx
  4015a3:	83 e2 0f             	and    $0xf,%edx
  4015a6:	03 0c 95 a0 22 40 00 	add    0x4022a0(,%rdx,4),%ecx
  4015ad:	48 83 c0 01          	add    $0x1,%rax
  4015b1:	48 39 f8             	cmp    %rdi,%rax
  4015b4:	75 ea                	jne    4015a0 <phase_5+0x1a>
  4015b6:	83 f9 35             	cmp    $0x35,%ecx
  4015b9:	75 09                	jne    4015c4 <phase_5+0x3e>
  4015bb:	5b                   	pop    %rbx
  4015bc:	c3                   	retq   
  4015bd:	e8 bf 05 00 00       	callq  401b81 <explode_bomb>
  4015c2:	eb d0                	jmp    401594 <phase_5+0xe>
  4015c4:	e8 b8 05 00 00       	callq  401b81 <explode_bomb>
  4015c9:	eb f0                	jmp    4015bb <phase_5+0x35>

00000000004015cb <fun6>:
  4015cb:	4c 8b 47 08          	mov    0x8(%rdi),%r8
  4015cf:	48 c7 47 08 00 00 00 	movq   $0x0,0x8(%rdi)
  4015d6:	00 
  4015d7:	4d 85 c0             	test   %r8,%r8
  4015da:	75 2b                	jne    401607 <fun6+0x3c>
  4015dc:	48 89 f8             	mov    %rdi,%rax
  4015df:	c3                   	retq   
  4015e0:	48 39 c1             	cmp    %rax,%rcx
  4015e3:	75 08                	jne    4015ed <fun6+0x22>
  4015e5:	48 89 c2             	mov    %rax,%rdx
  4015e8:	4c 89 c7             	mov    %r8,%rdi
  4015eb:	eb 0a                	jmp    4015f7 <fun6+0x2c>
  4015ed:	48 89 c2             	mov    %rax,%rdx
  4015f0:	48 89 c8             	mov    %rcx,%rax
  4015f3:	4c 89 40 08          	mov    %r8,0x8(%rax)
  4015f7:	49 8b 40 08          	mov    0x8(%r8),%rax
  4015fb:	49 89 50 08          	mov    %rdx,0x8(%r8)
  4015ff:	48 85 c0             	test   %rax,%rax
  401602:	74 d8                	je     4015dc <fun6+0x11>
  401604:	49 89 c0             	mov    %rax,%r8
  401607:	48 85 ff             	test   %rdi,%rdi
  40160a:	74 1e                	je     40162a <fun6+0x5f>
  40160c:	41 8b 30             	mov    (%r8),%esi
  40160f:	48 89 f8             	mov    %rdi,%rax
  401612:	48 89 f9             	mov    %rdi,%rcx
  401615:	39 30                	cmp    %esi,(%rax)
  401617:	7e c7                	jle    4015e0 <fun6+0x15>
  401619:	48 8b 50 08          	mov    0x8(%rax),%rdx
  40161d:	48 89 c1             	mov    %rax,%rcx
  401620:	48 85 d2             	test   %rdx,%rdx
  401623:	74 ce                	je     4015f3 <fun6+0x28>
  401625:	48 89 d0             	mov    %rdx,%rax
  401628:	eb eb                	jmp    401615 <fun6+0x4a>
  40162a:	48 89 fa             	mov    %rdi,%rdx
  40162d:	4c 89 c7             	mov    %r8,%rdi
  401630:	eb c5                	jmp    4015f7 <fun6+0x2c>

0000000000401632 <phase_6>:
  401632:	53                   	push   %rbx
  401633:	ba 0a 00 00 00       	mov    $0xa,%edx
  401638:	be 00 00 00 00       	mov    $0x0,%esi
  40163d:	e8 ee fa ff ff       	callq  401130 <strtol@plt>
  401642:	48 89 c3             	mov    %rax,%rbx
  401645:	bf 00 43 40 00       	mov    $0x404300,%edi
  40164a:	e8 7c ff ff ff       	callq  4015cb <fun6>
  40164f:	48 8b 40 08          	mov    0x8(%rax),%rax
  401653:	48 8b 40 08          	mov    0x8(%rax),%rax
  401657:	48 8b 40 08          	mov    0x8(%rax),%rax
  40165b:	48 8b 40 08          	mov    0x8(%rax),%rax
  40165f:	48 8b 40 08          	mov    0x8(%rax),%rax
  401663:	48 8b 40 08          	mov    0x8(%rax),%rax
  401667:	39 18                	cmp    %ebx,(%rax)
  401669:	75 02                	jne    40166d <phase_6+0x3b>
  40166b:	5b                   	pop    %rbx
  40166c:	c3                   	retq   
  40166d:	e8 0f 05 00 00       	callq  401b81 <explode_bomb>
  401672:	eb f7                	jmp    40166b <phase_6+0x39>

0000000000401674 <fun7>:
  401674:	48 85 ff             	test   %rdi,%rdi
  401677:	74 32                	je     4016ab <fun7+0x37>
  401679:	48 83 ec 08          	sub    $0x8,%rsp
  40167d:	8b 17                	mov    (%rdi),%edx
  40167f:	39 f2                	cmp    %esi,%edx
  401681:	7f 0c                	jg     40168f <fun7+0x1b>
  401683:	b8 00 00 00 00       	mov    $0x0,%eax
  401688:	75 12                	jne    40169c <fun7+0x28>
  40168a:	48 83 c4 08          	add    $0x8,%rsp
  40168e:	c3                   	retq   
  40168f:	48 8b 7f 08          	mov    0x8(%rdi),%rdi
  401693:	e8 dc ff ff ff       	callq  401674 <fun7>
  401698:	01 c0                	add    %eax,%eax
  40169a:	eb ee                	jmp    40168a <fun7+0x16>
  40169c:	48 8b 7f 10          	mov    0x10(%rdi),%rdi
  4016a0:	e8 cf ff ff ff       	callq  401674 <fun7>
  4016a5:	8d 44 00 01          	lea    0x1(%rax,%rax,1),%eax
  4016a9:	eb df                	jmp    40168a <fun7+0x16>
  4016ab:	b8 ff ff ff ff       	mov    $0xffffffff,%eax
  4016b0:	c3                   	retq   

00000000004016b1 <secret_phase>:
  4016b1:	53                   	push   %rbx
  4016b2:	e8 2b 05 00 00       	callq  401be2 <read_line>
  4016b7:	48 89 c7             	mov    %rax,%rdi
  4016ba:	ba 0a 00 00 00       	mov    $0xa,%edx
  4016bf:	be 00 00 00 00       	mov    $0x0,%esi
  4016c4:	e8 67 fa ff ff       	callq  401130 <strtol@plt>
  4016c9:	89 c3                	mov    %eax,%ebx
  4016cb:	83 e8 01             	sub    $0x1,%eax
  4016ce:	3d e8 03 00 00       	cmp    $0x3e8,%eax
  4016d3:	77 22                	ja     4016f7 <secret_phase+0x46>
  4016d5:	89 de                	mov    %ebx,%esi
  4016d7:	bf 20 41 40 00       	mov    $0x404120,%edi
  4016dc:	e8 93 ff ff ff       	callq  401674 <fun7>
  4016e1:	83 f8 05             	cmp    $0x5,%eax
  4016e4:	75 18                	jne    4016fe <secret_phase+0x4d>
  4016e6:	bf 38 22 40 00       	mov    $0x402238,%edi
  4016eb:	e8 60 f9 ff ff       	callq  401050 <puts@plt>
  4016f0:	e8 cd 05 00 00       	callq  401cc2 <phase_defused>
  4016f5:	5b                   	pop    %rbx
  4016f6:	c3                   	retq   
  4016f7:	e8 85 04 00 00       	callq  401b81 <explode_bomb>
  4016fc:	eb d7                	jmp    4016d5 <secret_phase+0x24>
  4016fe:	e8 7e 04 00 00       	callq  401b81 <explode_bomb>
  401703:	eb e1                	jmp    4016e6 <secret_phase+0x35>

0000000000401705 <sig_handler>:
  401705:	48 83 ec 08          	sub    $0x8,%rsp
  401709:	bf e0 22 40 00       	mov    $0x4022e0,%edi
  40170e:	e8 3d f9 ff ff       	callq  401050 <puts@plt>
  401713:	bf 03 00 00 00       	mov    $0x3,%edi
  401718:	e8 b3 fa ff ff       	callq  4011d0 <sleep@plt>
  40171d:	bf d1 23 40 00       	mov    $0x4023d1,%edi
  401722:	b8 00 00 00 00       	mov    $0x0,%eax
  401727:	e8 64 f9 ff ff       	callq  401090 <printf@plt>
  40172c:	48 8b 3d 0d 33 00 00 	mov    0x330d(%rip),%rdi        # 404a40 <stdout@@GLIBC_2.2.5>
  401733:	e8 08 fa ff ff       	callq  401140 <fflush@plt>
  401738:	bf 01 00 00 00       	mov    $0x1,%edi
  40173d:	e8 8e fa ff ff       	callq  4011d0 <sleep@plt>
  401742:	bf d9 23 40 00       	mov    $0x4023d9,%edi
  401747:	e8 04 f9 ff ff       	callq  401050 <puts@plt>
  40174c:	bf 10 00 00 00       	mov    $0x10,%edi
  401751:	e8 4a fa ff ff       	callq  4011a0 <exit@plt>

0000000000401756 <invalid_phase>:
  401756:	48 83 ec 08          	sub    $0x8,%rsp
  40175a:	48 89 fe             	mov    %rdi,%rsi
  40175d:	bf e1 23 40 00       	mov    $0x4023e1,%edi
  401762:	b8 00 00 00 00       	mov    $0x0,%eax
  401767:	e8 24 f9 ff ff       	callq  401090 <printf@plt>
  40176c:	bf 08 00 00 00       	mov    $0x8,%edi
  401771:	e8 2a fa ff ff       	callq  4011a0 <exit@plt>

0000000000401776 <string_length>:
  401776:	80 3f 00             	cmpb   $0x0,(%rdi)
  401779:	74 12                	je     40178d <string_length+0x17>
  40177b:	b8 00 00 00 00       	mov    $0x0,%eax
  401780:	48 83 c7 01          	add    $0x1,%rdi
  401784:	83 c0 01             	add    $0x1,%eax
  401787:	80 3f 00             	cmpb   $0x0,(%rdi)
  40178a:	75 f4                	jne    401780 <string_length+0xa>
  40178c:	c3                   	retq   
  40178d:	b8 00 00 00 00       	mov    $0x0,%eax
  401792:	c3                   	retq   

0000000000401793 <strings_not_equal>:
  401793:	41 54                	push   %r12
  401795:	55                   	push   %rbp
  401796:	53                   	push   %rbx
  401797:	48 89 fb             	mov    %rdi,%rbx
  40179a:	48 89 f5             	mov    %rsi,%rbp
  40179d:	e8 d4 ff ff ff       	callq  401776 <string_length>
  4017a2:	41 89 c4             	mov    %eax,%r12d
  4017a5:	48 89 ef             	mov    %rbp,%rdi
  4017a8:	e8 c9 ff ff ff       	callq  401776 <string_length>
  4017ad:	89 c2                	mov    %eax,%edx
  4017af:	b8 01 00 00 00       	mov    $0x1,%eax
  4017b4:	41 39 d4             	cmp    %edx,%r12d
  4017b7:	75 31                	jne    4017ea <strings_not_equal+0x57>
  4017b9:	0f b6 13             	movzbl (%rbx),%edx
  4017bc:	84 d2                	test   %dl,%dl
  4017be:	74 1e                	je     4017de <strings_not_equal+0x4b>
  4017c0:	b8 00 00 00 00       	mov    $0x0,%eax
  4017c5:	38 54 05 00          	cmp    %dl,0x0(%rbp,%rax,1)
  4017c9:	75 1a                	jne    4017e5 <strings_not_equal+0x52>
  4017cb:	48 83 c0 01          	add    $0x1,%rax
  4017cf:	0f b6 14 03          	movzbl (%rbx,%rax,1),%edx
  4017d3:	84 d2                	test   %dl,%dl
  4017d5:	75 ee                	jne    4017c5 <strings_not_equal+0x32>
  4017d7:	b8 00 00 00 00       	mov    $0x0,%eax
  4017dc:	eb 0c                	jmp    4017ea <strings_not_equal+0x57>
  4017de:	b8 00 00 00 00       	mov    $0x0,%eax
  4017e3:	eb 05                	jmp    4017ea <strings_not_equal+0x57>
  4017e5:	b8 01 00 00 00       	mov    $0x1,%eax
  4017ea:	5b                   	pop    %rbx
  4017eb:	5d                   	pop    %rbp
  4017ec:	41 5c                	pop    %r12
  4017ee:	c3                   	retq   

00000000004017ef <open_clientfd>:
  4017ef:	41 54                	push   %r12
  4017f1:	55                   	push   %rbp
  4017f2:	53                   	push   %rbx
  4017f3:	48 83 ec 10          	sub    $0x10,%rsp
  4017f7:	48 89 fd             	mov    %rdi,%rbp
  4017fa:	41 89 f4             	mov    %esi,%r12d
  4017fd:	ba 00 00 00 00       	mov    $0x0,%edx
  401802:	be 01 00 00 00       	mov    $0x1,%esi
  401807:	bf 02 00 00 00       	mov    $0x2,%edi
  40180c:	e8 df f9 ff ff       	callq  4011f0 <socket@plt>
  401811:	85 c0                	test   %eax,%eax
  401813:	78 65                	js     40187a <open_clientfd+0x8b>
  401815:	89 c3                	mov    %eax,%ebx
  401817:	48 89 ef             	mov    %rbp,%rdi
  40181a:	e8 f1 f8 ff ff       	callq  401110 <gethostbyname@plt>
  40181f:	48 85 c0             	test   %rax,%rax
  401822:	74 6a                	je     40188e <open_clientfd+0x9f>
  401824:	48 c7 04 24 00 00 00 	movq   $0x0,(%rsp)
  40182b:	00 
  40182c:	48 c7 44 24 08 00 00 	movq   $0x0,0x8(%rsp)
  401833:	00 00 
  401835:	66 c7 04 24 02 00    	movw   $0x2,(%rsp)
  40183b:	48 63 50 14          	movslq 0x14(%rax),%rdx
  40183f:	48 8b 40 18          	mov    0x18(%rax),%rax
  401843:	48 8b 30             	mov    (%rax),%rsi
  401846:	48 8d 7c 24 04       	lea    0x4(%rsp),%rdi
  40184b:	e8 10 f9 ff ff       	callq  401160 <memmove@plt>
  401850:	44 89 e0             	mov    %r12d,%eax
  401853:	66 c1 c0 08          	rol    $0x8,%ax
  401857:	66 89 44 24 02       	mov    %ax,0x2(%rsp)
  40185c:	ba 10 00 00 00       	mov    $0x10,%edx
  401861:	48 89 e6             	mov    %rsp,%rsi
  401864:	89 df                	mov    %ebx,%edi
  401866:	e8 45 f9 ff ff       	callq  4011b0 <connect@plt>
  40186b:	85 c0                	test   %eax,%eax
  40186d:	78 33                	js     4018a2 <open_clientfd+0xb3>
  40186f:	89 d8                	mov    %ebx,%eax
  401871:	48 83 c4 10          	add    $0x10,%rsp
  401875:	5b                   	pop    %rbx
  401876:	5d                   	pop    %rbp
  401877:	41 5c                	pop    %r12
  401879:	c3                   	retq   
  40187a:	bf f2 23 40 00       	mov    $0x4023f2,%edi
  40187f:	e8 cc f7 ff ff       	callq  401050 <puts@plt>
  401884:	bf 08 00 00 00       	mov    $0x8,%edi
  401889:	e8 12 f9 ff ff       	callq  4011a0 <exit@plt>
  40188e:	bf 00 24 40 00       	mov    $0x402400,%edi
  401893:	e8 b8 f7 ff ff       	callq  401050 <puts@plt>
  401898:	bf 08 00 00 00       	mov    $0x8,%edi
  40189d:	e8 fe f8 ff ff       	callq  4011a0 <exit@plt>
  4018a2:	bf 0e 24 40 00       	mov    $0x40240e,%edi
  4018a7:	e8 a4 f7 ff ff       	callq  401050 <puts@plt>
  4018ac:	bf 08 00 00 00       	mov    $0x8,%edi
  4018b1:	e8 ea f8 ff ff       	callq  4011a0 <exit@plt>

00000000004018b6 <initialize_bomb>:
  4018b6:	48 83 ec 08          	sub    $0x8,%rsp
  4018ba:	be 05 17 40 00       	mov    $0x401705,%esi
  4018bf:	bf 02 00 00 00       	mov    $0x2,%edi
  4018c4:	e8 37 f8 ff ff       	callq  401100 <signal@plt>
  4018c9:	48 83 c4 08          	add    $0x8,%rsp
  4018cd:	c3                   	retq   

00000000004018ce <blank_line>:
  4018ce:	55                   	push   %rbp
  4018cf:	53                   	push   %rbx
  4018d0:	48 83 ec 08          	sub    $0x8,%rsp
  4018d4:	48 89 fd             	mov    %rdi,%rbp
  4018d7:	0f b6 5d 00          	movzbl 0x0(%rbp),%ebx
  4018db:	84 db                	test   %bl,%bl
  4018dd:	74 1e                	je     4018fd <blank_line+0x2f>
  4018df:	e8 fc f8 ff ff       	callq  4011e0 <__ctype_b_loc@plt>
  4018e4:	48 83 c5 01          	add    $0x1,%rbp
  4018e8:	48 0f be db          	movsbq %bl,%rbx
  4018ec:	48 8b 00             	mov    (%rax),%rax
  4018ef:	f6 44 58 01 20       	testb  $0x20,0x1(%rax,%rbx,2)
  4018f4:	75 e1                	jne    4018d7 <blank_line+0x9>
  4018f6:	b8 00 00 00 00       	mov    $0x0,%eax
  4018fb:	eb 05                	jmp    401902 <blank_line+0x34>
  4018fd:	b8 01 00 00 00       	mov    $0x1,%eax
  401902:	48 83 c4 08          	add    $0x8,%rsp
  401906:	5b                   	pop    %rbx
  401907:	5d                   	pop    %rbp
  401908:	c3                   	retq   

0000000000401909 <skip>:
  401909:	53                   	push   %rbx
  40190a:	48 63 05 bf 31 00 00 	movslq 0x31bf(%rip),%rax        # 404ad0 <num_input_strings>
  401911:	48 8d 3c 80          	lea    (%rax,%rax,4),%rdi
  401915:	48 c1 e7 04          	shl    $0x4,%rdi
  401919:	48 81 c7 e0 4a 40 00 	add    $0x404ae0,%rdi
  401920:	48 8b 15 39 31 00 00 	mov    0x3139(%rip),%rdx        # 404a60 <infile>
  401927:	be 50 00 00 00       	mov    $0x50,%esi
  40192c:	e8 af f7 ff ff       	callq  4010e0 <fgets@plt>
  401931:	48 89 c3             	mov    %rax,%rbx
  401934:	48 85 c0             	test   %rax,%rax
  401937:	74 0c                	je     401945 <skip+0x3c>
  401939:	48 89 c7             	mov    %rax,%rdi
  40193c:	e8 8d ff ff ff       	callq  4018ce <blank_line>
  401941:	85 c0                	test   %eax,%eax
  401943:	75 c5                	jne    40190a <skip+0x1>
  401945:	48 89 d8             	mov    %rbx,%rax
  401948:	5b                   	pop    %rbx
  401949:	c3                   	retq   

000000000040194a <send_msg>:
  40194a:	41 55                	push   %r13
  40194c:	41 54                	push   %r12
  40194e:	55                   	push   %rbp
  40194f:	53                   	push   %rbx
  401950:	48 83 ec 58          	sub    $0x58,%rsp
  401954:	89 fb                	mov    %edi,%ebx
  401956:	bf 00 00 00 00       	mov    $0x0,%edi
  40195b:	e8 50 f7 ff ff       	callq  4010b0 <dup@plt>
  401960:	83 f8 ff             	cmp    $0xffffffff,%eax
  401963:	0f 84 74 01 00 00    	je     401add <send_msg+0x193>
  401969:	41 89 c5             	mov    %eax,%r13d
  40196c:	bf 00 00 00 00       	mov    $0x0,%edi
  401971:	e8 4a f7 ff ff       	callq  4010c0 <close@plt>
  401976:	83 f8 ff             	cmp    $0xffffffff,%eax
  401979:	0f 84 72 01 00 00    	je     401af1 <send_msg+0x1a7>
  40197f:	e8 6c f7 ff ff       	callq  4010f0 <tmpfile@plt>
  401984:	49 89 c4             	mov    %rax,%r12
  401987:	48 85 c0             	test   %rax,%rax
  40198a:	0f 84 75 01 00 00    	je     401b05 <send_msg+0x1bb>
  401990:	48 89 c1             	mov    %rax,%rcx
  401993:	ba 1b 00 00 00       	mov    $0x1b,%edx
  401998:	be 01 00 00 00       	mov    $0x1,%esi
  40199d:	bf 69 24 40 00       	mov    $0x402469,%edi
  4019a2:	e8 19 f8 ff ff       	callq  4011c0 <fwrite@plt>
  4019a7:	4c 89 e6             	mov    %r12,%rsi
  4019aa:	bf 0a 00 00 00       	mov    $0xa,%edi
  4019af:	e8 1c f7 ff ff       	callq  4010d0 <fputc@plt>
  4019b4:	bf 00 00 00 00       	mov    $0x0,%edi
  4019b9:	e8 b2 f7 ff ff       	callq  401170 <cuserid@plt>
  4019be:	48 89 c6             	mov    %rax,%rsi
  4019c1:	48 85 c0             	test   %rax,%rax
  4019c4:	0f 84 4f 01 00 00    	je     401b19 <send_msg+0x1cf>
  4019ca:	48 89 e7             	mov    %rsp,%rdi
  4019cd:	e8 6e f6 ff ff       	callq  401040 <strcpy@plt>
  4019d2:	85 db                	test   %ebx,%ebx
  4019d4:	41 b9 1c 24 40 00    	mov    $0x40241c,%r9d
  4019da:	b8 24 24 40 00       	mov    $0x402424,%eax
  4019df:	4c 0f 44 c8          	cmove  %rax,%r9
  4019e3:	48 83 ec 08          	sub    $0x8,%rsp
  4019e7:	8b 05 e3 30 00 00    	mov    0x30e3(%rip),%eax        # 404ad0 <num_input_strings>
  4019ed:	50                   	push   %rax
  4019ee:	4c 8d 44 24 10       	lea    0x10(%rsp),%r8
  4019f3:	8b 0d a7 2d 00 00    	mov    0x2da7(%rip),%ecx        # 4047a0 <bomb_id>
  4019f9:	ba a0 43 40 00       	mov    $0x4043a0,%edx
  4019fe:	be 85 24 40 00       	mov    $0x402485,%esi
  401a03:	4c 89 e7             	mov    %r12,%rdi
  401a06:	b8 00 00 00 00       	mov    $0x0,%eax
  401a0b:	e8 10 f7 ff ff       	callq  401120 <fprintf@plt>
  401a10:	48 83 c4 10          	add    $0x10,%rsp
  401a14:	83 3d b5 30 00 00 00 	cmpl   $0x0,0x30b5(%rip)        # 404ad0 <num_input_strings>
  401a1b:	7e 47                	jle    401a64 <send_msg+0x11a>
  401a1d:	bd e0 4a 40 00       	mov    $0x404ae0,%ebp
  401a22:	bb 00 00 00 00       	mov    $0x0,%ebx
  401a27:	83 c3 01             	add    $0x1,%ebx
  401a2a:	48 83 ec 08          	sub    $0x8,%rsp
  401a2e:	55                   	push   %rbp
  401a2f:	41 89 d9             	mov    %ebx,%r9d
  401a32:	4c 8d 44 24 10       	lea    0x10(%rsp),%r8
  401a37:	8b 0d 63 2d 00 00    	mov    0x2d63(%rip),%ecx        # 4047a0 <bomb_id>
  401a3d:	ba a0 43 40 00       	mov    $0x4043a0,%edx
  401a42:	be a1 24 40 00       	mov    $0x4024a1,%esi
  401a47:	4c 89 e7             	mov    %r12,%rdi
  401a4a:	b8 00 00 00 00       	mov    $0x0,%eax
  401a4f:	e8 cc f6 ff ff       	callq  401120 <fprintf@plt>
  401a54:	48 83 c5 50          	add    $0x50,%rbp
  401a58:	48 83 c4 10          	add    $0x10,%rsp
  401a5c:	3b 1d 6e 30 00 00    	cmp    0x306e(%rip),%ebx        # 404ad0 <num_input_strings>
  401a62:	7c c3                	jl     401a27 <send_msg+0xdd>
  401a64:	4c 89 e7             	mov    %r12,%rdi
  401a67:	e8 34 f6 ff ff       	callq  4010a0 <rewind@plt>
  401a6c:	41 b8 18 23 40 00    	mov    $0x402318,%r8d
  401a72:	b9 bd 24 40 00       	mov    $0x4024bd,%ecx
  401a77:	ba c2 24 40 00       	mov    $0x4024c2,%edx
  401a7c:	be d9 24 40 00       	mov    $0x4024d9,%esi
  401a81:	bf 80 4a 40 00       	mov    $0x404a80,%edi
  401a86:	b8 00 00 00 00       	mov    $0x0,%eax
  401a8b:	e8 00 f7 ff ff       	callq  401190 <sprintf@plt>
  401a90:	bf 80 4a 40 00       	mov    $0x404a80,%edi
  401a95:	e8 e6 f5 ff ff       	callq  401080 <system@plt>
  401a9a:	85 c0                	test   %eax,%eax
  401a9c:	0f 85 8f 00 00 00    	jne    401b31 <send_msg+0x1e7>
  401aa2:	4c 89 e7             	mov    %r12,%rdi
  401aa5:	e8 b6 f5 ff ff       	callq  401060 <fclose@plt>
  401aaa:	85 c0                	test   %eax,%eax
  401aac:	0f 85 93 00 00 00    	jne    401b45 <send_msg+0x1fb>
  401ab2:	44 89 ef             	mov    %r13d,%edi
  401ab5:	e8 f6 f5 ff ff       	callq  4010b0 <dup@plt>
  401aba:	85 c0                	test   %eax,%eax
  401abc:	0f 85 97 00 00 00    	jne    401b59 <send_msg+0x20f>
  401ac2:	44 89 ef             	mov    %r13d,%edi
  401ac5:	e8 f6 f5 ff ff       	callq  4010c0 <close@plt>
  401aca:	85 c0                	test   %eax,%eax
  401acc:	0f 85 9b 00 00 00    	jne    401b6d <send_msg+0x223>
  401ad2:	48 83 c4 58          	add    $0x58,%rsp
  401ad6:	5b                   	pop    %rbx
  401ad7:	5d                   	pop    %rbp
  401ad8:	41 5c                	pop    %r12
  401ada:	41 5d                	pop    %r13
  401adc:	c3                   	retq   
  401add:	bf 2d 24 40 00       	mov    $0x40242d,%edi
  401ae2:	e8 69 f5 ff ff       	callq  401050 <puts@plt>
  401ae7:	bf 08 00 00 00       	mov    $0x8,%edi
  401aec:	e8 af f6 ff ff       	callq  4011a0 <exit@plt>
  401af1:	bf 41 24 40 00       	mov    $0x402441,%edi
  401af6:	e8 55 f5 ff ff       	callq  401050 <puts@plt>
  401afb:	bf 08 00 00 00       	mov    $0x8,%edi
  401b00:	e8 9b f6 ff ff       	callq  4011a0 <exit@plt>
  401b05:	bf 54 24 40 00       	mov    $0x402454,%edi
  401b0a:	e8 41 f5 ff ff       	callq  401050 <puts@plt>
  401b0f:	bf 08 00 00 00       	mov    $0x8,%edi
  401b14:	e8 87 f6 ff ff       	callq  4011a0 <exit@plt>
  401b19:	c7 04 24 6e 6f 62 6f 	movl   $0x6f626f6e,(%rsp)
  401b20:	66 c7 44 24 04 64 79 	movw   $0x7964,0x4(%rsp)
  401b27:	c6 44 24 06 00       	movb   $0x0,0x6(%rsp)
  401b2c:	e9 a1 fe ff ff       	jmpq   4019d2 <send_msg+0x88>
  401b31:	bf e2 24 40 00       	mov    $0x4024e2,%edi
  401b36:	e8 15 f5 ff ff       	callq  401050 <puts@plt>
  401b3b:	bf 08 00 00 00       	mov    $0x8,%edi
  401b40:	e8 5b f6 ff ff       	callq  4011a0 <exit@plt>
  401b45:	bf fc 24 40 00       	mov    $0x4024fc,%edi
  401b4a:	e8 01 f5 ff ff       	callq  401050 <puts@plt>
  401b4f:	bf 08 00 00 00       	mov    $0x8,%edi
  401b54:	e8 47 f6 ff ff       	callq  4011a0 <exit@plt>
  401b59:	bf 15 25 40 00       	mov    $0x402515,%edi
  401b5e:	e8 ed f4 ff ff       	callq  401050 <puts@plt>
  401b63:	bf 08 00 00 00       	mov    $0x8,%edi
  401b68:	e8 33 f6 ff ff       	callq  4011a0 <exit@plt>
  401b6d:	bf 30 25 40 00       	mov    $0x402530,%edi
  401b72:	e8 d9 f4 ff ff       	callq  401050 <puts@plt>
  401b77:	bf 08 00 00 00       	mov    $0x8,%edi
  401b7c:	e8 1f f6 ff ff       	callq  4011a0 <exit@plt>

0000000000401b81 <explode_bomb>:
  401b81:	48 83 ec 08          	sub    $0x8,%rsp
  401b85:	bf 47 25 40 00       	mov    $0x402547,%edi
  401b8a:	e8 c1 f4 ff ff       	callq  401050 <puts@plt>
  401b8f:	bf 50 25 40 00       	mov    $0x402550,%edi
  401b94:	e8 b7 f4 ff ff       	callq  401050 <puts@plt>
  401b99:	bf 08 00 00 00       	mov    $0x8,%edi
  401b9e:	e8 fd f5 ff ff       	callq  4011a0 <exit@plt>

0000000000401ba3 <read_six_numbers>:
  401ba3:	48 83 ec 08          	sub    $0x8,%rsp
  401ba7:	48 89 f2             	mov    %rsi,%rdx
  401baa:	48 8d 4e 04          	lea    0x4(%rsi),%rcx
  401bae:	48 8d 46 14          	lea    0x14(%rsi),%rax
  401bb2:	50                   	push   %rax
  401bb3:	48 8d 46 10          	lea    0x10(%rsi),%rax
  401bb7:	50                   	push   %rax
  401bb8:	4c 8d 4e 0c          	lea    0xc(%rsi),%r9
  401bbc:	4c 8d 46 08          	lea    0x8(%rsi),%r8
  401bc0:	be 67 25 40 00       	mov    $0x402567,%esi
  401bc5:	b8 00 00 00 00       	mov    $0x0,%eax
  401bca:	e8 81 f5 ff ff       	callq  401150 <__isoc99_sscanf@plt>
  401bcf:	48 83 c4 10          	add    $0x10,%rsp
  401bd3:	83 f8 05             	cmp    $0x5,%eax
  401bd6:	7e 05                	jle    401bdd <read_six_numbers+0x3a>
  401bd8:	48 83 c4 08          	add    $0x8,%rsp
  401bdc:	c3                   	retq   
  401bdd:	e8 9f ff ff ff       	callq  401b81 <explode_bomb>

0000000000401be2 <read_line>:
  401be2:	55                   	push   %rbp
  401be3:	53                   	push   %rbx
  401be4:	48 83 ec 08          	sub    $0x8,%rsp
  401be8:	b8 00 00 00 00       	mov    $0x0,%eax
  401bed:	e8 17 fd ff ff       	callq  401909 <skip>
  401bf2:	48 85 c0             	test   %rax,%rax
  401bf5:	74 54                	je     401c4b <read_line+0x69>
  401bf7:	8b 2d d3 2e 00 00    	mov    0x2ed3(%rip),%ebp        # 404ad0 <num_input_strings>
  401bfd:	48 63 c5             	movslq %ebp,%rax
  401c00:	48 8d 1c 80          	lea    (%rax,%rax,4),%rbx
  401c04:	48 c1 e3 04          	shl    $0x4,%rbx
  401c08:	48 81 c3 e0 4a 40 00 	add    $0x404ae0,%rbx
  401c0f:	48 89 df             	mov    %rbx,%rdi
  401c12:	e8 59 f4 ff ff       	callq  401070 <strlen@plt>
  401c17:	83 f8 4f             	cmp    $0x4f,%eax
  401c1a:	0f 84 93 00 00 00    	je     401cb3 <read_line+0xd1>
  401c20:	83 e8 01             	sub    $0x1,%eax
  401c23:	48 98                	cltq   
  401c25:	48 63 d5             	movslq %ebp,%rdx
  401c28:	48 8d 14 92          	lea    (%rdx,%rdx,4),%rdx
  401c2c:	48 c1 e2 04          	shl    $0x4,%rdx
  401c30:	c6 84 10 e0 4a 40 00 	movb   $0x0,0x404ae0(%rax,%rdx,1)
  401c37:	00 
  401c38:	83 c5 01             	add    $0x1,%ebp
  401c3b:	89 2d 8f 2e 00 00    	mov    %ebp,0x2e8f(%rip)        # 404ad0 <num_input_strings>
  401c41:	48 89 d8             	mov    %rbx,%rax
  401c44:	48 83 c4 08          	add    $0x8,%rsp
  401c48:	5b                   	pop    %rbx
  401c49:	5d                   	pop    %rbp
  401c4a:	c3                   	retq   
  401c4b:	48 8b 05 fe 2d 00 00 	mov    0x2dfe(%rip),%rax        # 404a50 <stdin@@GLIBC_2.2.5>
  401c52:	48 39 05 07 2e 00 00 	cmp    %rax,0x2e07(%rip)        # 404a60 <infile>
  401c59:	74 19                	je     401c74 <read_line+0x92>
  401c5b:	bf 97 25 40 00       	mov    $0x402597,%edi
  401c60:	e8 cb f3 ff ff       	callq  401030 <getenv@plt>
  401c65:	48 85 c0             	test   %rax,%rax
  401c68:	74 19                	je     401c83 <read_line+0xa1>
  401c6a:	bf 00 00 00 00       	mov    $0x0,%edi
  401c6f:	e8 2c f5 ff ff       	callq  4011a0 <exit@plt>
  401c74:	bf 79 25 40 00       	mov    $0x402579,%edi
  401c79:	e8 d2 f3 ff ff       	callq  401050 <puts@plt>
  401c7e:	e8 fe fe ff ff       	callq  401b81 <explode_bomb>
  401c83:	48 8b 05 c6 2d 00 00 	mov    0x2dc6(%rip),%rax        # 404a50 <stdin@@GLIBC_2.2.5>
  401c8a:	48 89 05 cf 2d 00 00 	mov    %rax,0x2dcf(%rip)        # 404a60 <infile>
  401c91:	b8 00 00 00 00       	mov    $0x0,%eax
  401c96:	e8 6e fc ff ff       	callq  401909 <skip>
  401c9b:	48 85 c0             	test   %rax,%rax
  401c9e:	0f 85 53 ff ff ff    	jne    401bf7 <read_line+0x15>
  401ca4:	bf 79 25 40 00       	mov    $0x402579,%edi
  401ca9:	e8 a2 f3 ff ff       	callq  401050 <puts@plt>
  401cae:	e8 ce fe ff ff       	callq  401b81 <explode_bomb>
  401cb3:	bf a2 25 40 00       	mov    $0x4025a2,%edi
  401cb8:	e8 93 f3 ff ff       	callq  401050 <puts@plt>
  401cbd:	e8 bf fe ff ff       	callq  401b81 <explode_bomb>

0000000000401cc2 <phase_defused>:
  401cc2:	83 3d 07 2e 00 00 06 	cmpl   $0x6,0x2e07(%rip)        # 404ad0 <num_input_strings>
  401cc9:	74 01                	je     401ccc <phase_defused+0xa>
  401ccb:	c3                   	retq   
  401ccc:	48 83 ec 68          	sub    $0x68,%rsp
  401cd0:	48 8d 4c 24 10       	lea    0x10(%rsp),%rcx
  401cd5:	48 8d 54 24 0c       	lea    0xc(%rsp),%rdx
  401cda:	be bd 25 40 00       	mov    $0x4025bd,%esi
  401cdf:	bf d0 4b 40 00       	mov    $0x404bd0,%edi
  401ce4:	b8 00 00 00 00       	mov    $0x0,%eax
  401ce9:	e8 62 f4 ff ff       	callq  401150 <__isoc99_sscanf@plt>
  401cee:	83 f8 02             	cmp    $0x2,%eax
  401cf1:	74 0f                	je     401d02 <phase_defused+0x40>
  401cf3:	bf a0 23 40 00       	mov    $0x4023a0,%edi
  401cf8:	e8 53 f3 ff ff       	callq  401050 <puts@plt>
  401cfd:	48 83 c4 68          	add    $0x68,%rsp
  401d01:	c3                   	retq   
  401d02:	be c3 25 40 00       	mov    $0x4025c3,%esi
  401d07:	48 8d 7c 24 10       	lea    0x10(%rsp),%rdi
  401d0c:	e8 82 fa ff ff       	callq  401793 <strings_not_equal>
  401d11:	85 c0                	test   %eax,%eax
  401d13:	75 de                	jne    401cf3 <phase_defused+0x31>
  401d15:	bf 40 23 40 00       	mov    $0x402340,%edi
  401d1a:	e8 31 f3 ff ff       	callq  401050 <puts@plt>
  401d1f:	bf 68 23 40 00       	mov    $0x402368,%edi
  401d24:	e8 27 f3 ff ff       	callq  401050 <puts@plt>
  401d29:	b8 00 00 00 00       	mov    $0x0,%eax
  401d2e:	e8 7e f9 ff ff       	callq  4016b1 <secret_phase>
  401d33:	eb be                	jmp    401cf3 <phase_defused+0x31>

Disassembly of section .fini:

0000000000401d38 <_fini>:
  401d38:	f3 0f 1e fa          	endbr64 
  401d3c:	48 83 ec 08          	sub    $0x8,%rsp
  401d40:	48 83 c4 08          	add    $0x8,%rsp
  401d44:	c3                   	retq   
